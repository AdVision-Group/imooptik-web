import React, { useEffect } from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import Api, { API_URL } from "../config/Api";
import { addToCart, getStorageItem, hideTransition, redirect, diopterValues, cylinderValues, cylinderAxisValues, distanceValues, setStorageItem, showTransition } from "../config/Config";
import { brands } from "../config/Database";

import Panel from "../components/Panel";
import Popup from "../components/Popup";
import SmoothScroll from "../components/SmoothScroll";
import Gallery from "../components/Gallery";

//import "../styles/product.css";

const colors = {
    red: "#D2222D",
    green: "#238823",
    yellow: "#FFBF00"
}

const tooltipTexts = [
    "Dioptrie vyjadrujú optickú mohutnosť šošovky. Určujú, aké silné musia byť šošovky, aby zabezpečili korekciu Vášho zraku",
    "Cylinder vyjadruje silu šošovky potrebnú na korekciu očného ochorenia zvaného astigmatizmus.",
    "Os cylindra vyjadruje stupeň a smer astigmatizmu. Ak na Vašom predpise nemáte žiaden údaj v políčku 'Os cylindra', netrpíte astigmatizmom a toto políčko pri objednávke nevypĺňajte"
]

class Product extends React.Component {

    state = {
        product: null,
        colorVariants: [],
        sizeVariants: [],
        images: [],
        currentImage: 0,
        imageWidth: 0,

        gallery: [],
        galleryShowing: false,

        menu: 3,

        modificationStage: 1,
        withDiopters: "",
        lensType: "",
        polarised: null,
        distanceOption: "",

        diopters: [],
        cylinder: [],
        cylinderAxes: [],
        distance: [],

        lensId: "",
        lens: null,

        lenses: [],

        panel: false,

        popup: false,
        loading: true,
        message: "",
        onPopupClose: () => this.setState({ popup: false }),

        secondButtonClose: false,
        device: "computer",

        brandImage: null
    }

    constructor() {
        super();

        this.loadData = this.loadData.bind(this);
        this.loadProduct = this.loadProduct.bind(this);
        this.loadImages = this.loadImages.bind(this);
        this.loadLenses = this.loadLenses.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.loadColorVariants = this.loadColorVariants.bind(this);
        this.loadSizeVariants = this.loadSizeVariants.bind(this);

        this.changeImage = this.changeImage.bind(this);

        this.changeLens = this.changeLens.bind(this);
        this.loadLens = this.loadLens.bind(this);

        this.changeDiopters = this.changeDiopters.bind(this);
        this.changeCylinder = this.changeCylinder.bind(this);
        this.changeCylinderAxes = this.changeCylinderAxes.bind(this);
        this.changeDistance = this.changeDistance.bind(this);

        this.dioptersSet = this.dioptersSet.bind(this);

        this.createCombinedProduct = this.createCombinedProduct.bind(this);

        this.getAvailable = this.getAvailable.bind(this);

        this.saveUserData = this.saveUserData.bind(this);

        this.changeLensType = this.changeLensType.bind(this);
        this.changeWithDiopters = this.changeWithDiopters.bind(this);
        this.changePolarised = this.changePolarised.bind(this);

        this.showRecipe = this.showRecipe.bind(this);
        this.hideRecipe = this.hideRecipe.bind(this);

        this.handleTooltip = this.handleTooltip.bind(this);

        this.openGallery = this.openGallery.bind(this);
        this.closeGallery = this.closeGallery.bind(this);

        this.handleImageResize = this.handleImageResize.bind(this);
        this.handleDeviceType = this.handleDeviceType.bind(this);

        this.getBrand = this.getBrand.bind(this);
    }

    getBrand() {
        for (let i = 0; i < brands.length; i++) {
            if (brands[i].name === this.state.product.brand) {
                this.setState({ brandImage: brands[i].image });
                return;
            }
        }

        return null;
    }

    async loadData() {
        await this.loadUser();
        await this.loadProduct();
    }

    async loadUser() {
        const { values } = this.props;

        if (values) {
            this.setState({
                diopters: values.diopters,
                cylinder: values.cylinder,
                cylinderAxes: values.cylinderAxes,
                distance: values.distance,

                distanceOption: values.distanceOption
            })
        }
    }

    async loadProduct() {
        const { product } = this.props;

        this.setState({ product: product }, async () => {
            await this.loadImages(this.state.product.image, this.state.product.bonusImages);
            await this.loadColorVariants();
            await this.loadSizeVariants();

            this.getBrand();
        });
    }

    async loadImages(image, moreImages) {
        var images = [];
        var gallery = [];
        if (image) images.push(image);
        if (image) gallery.push(API_URL + "/uploads/" + image.imagePath);

        for (let i = 0; i < moreImages.length; i++) {
            const call = await Api.getImage(moreImages[i]);

            if (call.image) {
                images.push(call.image);
                gallery.push(API_URL + "/uploads/" + call.image.imagePath);
            }
        }

        if (images.length === 0) images.push(null);
        if (gallery.length === 0) gallery.push(null);

        this.setState({ images: images, gallery: gallery }, () => {
            this.handleImageResize();
            window.addEventListener("resize", this.handleImageResize);
        });
    }

    handleImageResize() {
        this.handleDeviceType();

        var imagePanel = document.getElementById("image-panel");
        var imageWrapper = document.getElementById("image-wrapper");

        imagePanel.style.width = "100%";
        const width = imagePanel.clientWidth;
        this.setState({ imageWidth: width });
        imageWrapper.style.width = (width * this.state.images.length) + "px";
    }

    changeImage(value) {
        const { currentImage, images, imageWidth } = this.state;

        var imageWrapper = document.getElementById("image-wrapper");

        if (value === 1) {
            if (currentImage === images.length - 1) {
                imageWrapper.style.marginLeft = "0px";
                this.setState({ currentImage: 0 });
            } else {
                imageWrapper.style.marginLeft = -((currentImage + value) * imageWidth) + "px";
                this.setState({ currentImage: currentImage + value });
            }
        } else if (value === -1) {
            if (currentImage === 0) {
                imageWrapper.style.marginLeft = -((images.length - 1) * imageWidth) + "px";
                this.setState({ currentImage: images.length - 1 });
            } else {
                imageWrapper.style.marginLeft = -((currentImage + value) * imageWidth) + "px";
                this.setState({ currentImage: currentImage + value });
            }
        }
    }

    async loadColorVariants() {
        const { product } = this.state;
        var variants = [];

        const call = await Api.getProducts({
            filters: {
                eanCode: product.eanCode
            }
        });

        if (call.products) {
            for (let i = 0; i < call.products.length; i++) {
                var found = false;

                for (let j = 0; j < variants.length; j++) {
                    if (variants[j].colorCode === call.products[i].colorCode) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    variants.push(call.products[i]);
                }
            }

            this.setState({ colorVariants: variants });
        }
    }

    async loadSizeVariants() {
        const { product } = this.state;

        const call = await Api.getProducts({
            filters: {
                eanCode: product.eanCode,
                colorCode: product.colorCode
            }
        });

        if (call.products) {
            this.setState({ sizeVariants: call.products });
        }
    }

    async loadLenses() {
        const { lensType, withDiopters, polarised, distanceOption, diopters, cylinder } = this.state;

        var filters = {
            filters: {
                lensType: lensType,
                dioptric: withDiopters === "dioptric" ? true : withDiopters === "non-dioptric" ? false : false
            }
        }

        if (lensType === "slnečné" && polarised != null) {
            filters["filters"]["photochromic"] = polarised;
        }

        const call = await Api.getLenses(filters);

        if (call.lenses) {
            var lenses = [];

            if (withDiopters === "dioptric") {
                for (let i = 0; i < call.lenses.length; i++) {
                    const dioptersRight = distanceOption === "short" ? diopters[0] : diopters[2];
                    const dioptersLeft = distanceOption === "short" ? diopters[1] : diopters[3];
                    const cylinderRight = distanceOption === "short" ? cylinder[0] : cylinder[2];
                    const cylinderLeft = distanceOption === "short" ? cylinder[1] : cylinder[3];

                    if (cylinderRight === "1001" || cylinderLeft === "1001") {
                        if (dioptersRight >= call.lenses[i].dioptersRange[0] && dioptersRight <= call.lenses[i].dioptersRange[1] &&
                            dioptersLeft >= call.lenses[i].dioptersRange[0] && dioptersLeft <= call.lenses[i].dioptersRange[1]) {
    
                            lenses.push(call.lenses[i]);
                        }
                    } else {
                        if (dioptersRight >= call.lenses[i].dioptersRange[0] && dioptersRight <= call.lenses[i].dioptersRange[1] &&
                            dioptersLeft >= call.lenses[i].dioptersRange[0] && dioptersLeft <= call.lenses[i].dioptersRange[1] &&
                            cylinderRight >= call.lenses[i].cylinderRange[0] && cylinderRight <= call.lenses[i].cylinderRange[1] &&
                            cylinderLeft >= call.lenses[i].cylinderRange[0] && cylinderLeft <= call.lenses[i].cylinderRange[1]) {
    
                            lenses.push(call.lenses[i]);
                        }
                    }
                }
            } else {
                lenses = call.lenses;
            }

            this.setState({ lenses: lenses });
        }
    }

    changeWithDiopters(withDiopters) {
        const { modificationStage } = this.state;

        this.setState({ withDiopters: withDiopters }, () => {
            if (withDiopters === "dioptric") {
                if (modificationStage === 1) this.setState({ modificationStage: 2 }, () => SmoothScroll.scroll("#section-2", -30));
                if (modificationStage === 2) SmoothScroll.scroll("#section-2", -30);
                if (modificationStage === 3) {
                    if (this.dioptersSet()) {
                        this.loadLenses();
                        SmoothScroll.scroll("#section-4", -30);
                    } else {
                        SmoothScroll.scroll("#section-3", -30);
                    }
                }
            } else if (withDiopters === "non-dioptric") {
                if (modificationStage === 1) this.setState({ modificationStage: 2 }, () => SmoothScroll.scroll("#section-2", -30));
                if (modificationStage === 2) SmoothScroll.scroll("#section-2", -30);
                if (modificationStage === 3) {
                    SmoothScroll.scroll("#section-4", -30);
                }
            } else if (withDiopters === "no-lens") {
                this.setState({ modificationStage: 1, lensType: "", polarised: null }, () => SmoothScroll.scroll("#add-to-cart-button", -30));
            }
        });
    }

    changeLensType(type) {
        const { modificationStage, withDiopters } = this.state;

        this.setState({
            lensType: type
        }, async () => {
            if (type === "slnečné") {
                this.setState({ modificationStage: 2, polarised: null });
                return;
            }

            if (withDiopters === "dioptric") {
                if (modificationStage === 2) {
                    if (this.dioptersSet()) {
                        this.setState({ modificationStage: 3 }, () => {
                            this.loadLenses();
                            SmoothScroll.scroll("#section-4", -30);
                        });
                    } else {
                        this.setState({ modificationStage: 3 }, () => SmoothScroll.scroll("#section-3", -30));
                    }
                } else if (modificationStage === 3) {
                    if (this.dioptersSet()) {
                        this.loadLenses();
                        SmoothScroll.scroll("#section-4", -30);
                    } else {
                        SmoothScroll.scroll("#section-3", -30);
                    }
                }
            } else if (withDiopters === "non-dioptric") {
                if (modificationStage === 2) {
                    this.setState({ modificationStage: 3 }, () => {
                        this.loadLenses();
                        SmoothScroll.scroll("#section-4", -30);
                    });
                } else if (modificationStage === 3) {
                    this.loadLenses();
                    SmoothScroll.scroll("#section-4", -30);
                }
            }
        });
    }

    changePolarised(polarised) {
        const { modificationStage, withDiopters } = this.state;

        this.setState({ polarised: polarised, modificationStage: 3 }, () => {
            if (withDiopters === "dioptric") {
                if (modificationStage === 2) {
                    if (this.dioptersSet()) {
                        this.setState({ modificationStage: 3 }, () => {
                            this.loadLenses();
                            SmoothScroll.scroll("#section-4", -30);
                        });
                    } else {
                        this.setState({ modificationStage: 3 }, () => {
                            SmoothScroll.scroll("#section-3", -30);
                        });
                    }
                } else if (modificationStage === 3) {
                    if (this.dioptersSet()) {
                        this.setState({ modificationStage: 3 }, () => {
                            this.loadLenses();
                            SmoothScroll.scroll("#section-4", -30);
                        });
                    } else {
                        this.setState({ modificationStage: 3 }, () => {
                            SmoothScroll.scroll("#section-3", -30);
                        });
                    }
                }
            } else if (withDiopters === "non-dioptric") {
                this.setState({ modificationStage: 3 }, () => {
                    this.loadLenses();
                    SmoothScroll.scroll("#section-4", -30);
                });
            }
        });
    }

    async createCombinedProduct() {
        this.setState({ popup: true, loading: true });

        const { product, lens, lensId, specs, withDiopters, modificationStage } = this.state;

        if (product.available[1] + product.available[2] + product.available[3] + product.available[4] + product.available[5] + product.available[6] <= 0) {
            this.setState({
                loading: false,
                message: "Produkt je momentálne vypredaný",
                onPopupClose: () => this.setState({ popup: false }),
                secondButtonClose: false
            });

            return;
        }

        if (withDiopters === "") {
            this.setState({
                loading: false,
                message: "Nezadali ste, či si chcete objednať iba rám, alebo aj šošovky",
                onPopupClose: () => this.setState({ popup: false, menu: 3, modificationStage: 1 }, () => SmoothScroll.scroll("#section-1", -30)),
                secondButtonClose: false
            });

            return;
        } else {
            if (withDiopters === "dioptric") {
                if (!this.dioptersSet()) {
                    this.setState({
                        loading: false,
                        message: "Nezadali ste svoje očné hodnoty",
                        onPopupClose: () => this.setState({ popup: false, menu: 3, modificationStage: 3 }, () => SmoothScroll.scroll("#section-3", -30)),
                        secondButtonClose: false
                    });

                    return;
                }

                if (lens === null) {
                    this.setState({
                        loading: false,
                        message: "Nevybrali ste si šošovky",
                        onPopupClose: () => {
                            if (modificationStage === 2) {
                                this.setState({ popup: false, menu: 3, modificationStage: 2 }, () => SmoothScroll.scroll("#section-2", -30));
                            } else if (modificationStage === 3) {
                                this.setState({ popup: false, menu: 3, modificationStage: 3 }, () => SmoothScroll.scroll("#section-4", -30));
                            }
                        },
                        secondButtonClose: false
                    });

                    return;
                }

                if (getStorageItem("token")) {
                    const editUser = await this.saveUserData();

                    if (!editUser.user) {
                        this.setState({
                            loading: false,
                            message: "Nastala neočakávaná chyba, skúste to znovu neskôr prosím",
                            onPopupClose: () => this.setState({ popup: false }),
                            secondButtonClose: false
                        });

                        return;
                    }
                } else {
                    const editUser = await this.saveUserData();

                    if (!editUser.success) {
                        this.setState({
                            loading: false,
                            message: "Nastala neočakávaná chyba, skúste to znovu neskôr prosím",
                            onPopupClose: () => this.setState({ popup: false }),
                            secondButtonClose: false
                        });

                        return;
                    }
                }

                const call = await Api.createCombinedProduct({
                    product: product._id,
                    lens: lensId
                });
        
                if (call.combinedProduct) {
                    addToCart(call.combinedProduct._id);
        
                    this.setState({
                        loading: false,
                        message: "Produkt úspešne pridaný do košíka",
                        onPopupClose: () => {
                            showTransition();
                            this.props.router.push("/kosik");
                        },
                        secondButtonClose: false
                    });
                } else {
                    this.setState({
                        loading: false,
                        message: "Server neodpovedá, skúste to neskôr prosím",
                        onPopupClose: () => this.setState({ popup: false }),
                        secondButtonClose: false
                    });
                }
            } else if (withDiopters === "non-dioptric") {
                if (lens === null) {
                    this.setState({
                        loading: false,
                        message: "Nevybrali ste si šošovky",
                        onPopupClose: () => {
                            if (modificationStage === 2) {
                                this.setState({ popup: false, menu: 3, modificationStage: 2 }, () => SmoothScroll.scroll("#section-2", -30));
                            } else if (modificationStage === 3) {
                                this.setState({ popup: false, menu: 3, modificationStage: 3 }, () => SmoothScroll.scroll("#section-4", -30));
                            }
                        },
                        secondButtonClose: false
                    });

                    return;
                }

                const call = await Api.createCombinedProduct({
                    product: product._id,
                    lens: lensId
                });

                if (call.combinedProduct) {
                    addToCart(call.combinedProduct._id);
                    this.setState({
                        loading: false,
                        message: "Produkt úspešne pridaný do košíka",
                        onPopupClose: () => {
                            showTransition();
                            this.props.router.push("/kosik");
                        },
                        secondButtonClose: false
                    });
                } else {
                    this.setState({
                        loading: false,
                        message: "Server neodpovedá, skúste to neskôr prosím",
                        onPopupClose: () => this.setState({ popup: false }),
                        secondButtonClose: false
                    });
                }
            } else if (withDiopters === "no-lens") {
                const call = await Api.createCombinedProduct({
                    product: product._id,
                });

                if (call.combinedProduct) {
                    addToCart(call.combinedProduct._id);
                    this.setState({
                        loading: false,
                        message: "Produkt úspešne pridaný do košíka",
                        onPopupClose: () => {
                            showTransition();
                            this.props.history.push("/kosik");
                        },
                        secondButtonClose: false
                    });
                } else {
                    this.setState({
                        loading: false,
                        message: "Server neodpovedá, skúste to neskôr prosím",
                        onPopupClose: () => this.setState({ popup: false }),
                        secondButtonClose: false
                    });
                }
            }
        }
    }

    async saveUserData() {
        const token = getStorageItem("token");
        const { diopters, cylinder, cylinderAxes, distance, distanceOption } = this.state;

        var data = {};

        if (distanceOption === "short") {
            data["lenses"] = {
                diopters: [ parseFloat(diopters[0]), parseFloat(diopters[1]), 1001, 1001 ],
                cylinder: [ parseFloat(cylinder[0]), parseFloat(cylinder[1]), 1001, 1001 ],
                cylinderAxes: [ parseFloat(cylinderAxes[0]), parseFloat(cylinderAxes[1]), 1001, 1001 ],
                distance: [ parseFloat(distance[0]), parseFloat(distance[1]), 1001, 1001 ],
            }
        } else {
            data["lenses"] = {
                diopters: [ 1001, 1001, parseFloat(diopters[2]), parseFloat(diopters[3]) ],
                cylinder: [ 1001, 1001, parseFloat(cylinder[2]), parseFloat(cylinder[3]) ],
                cylinderAxes: [ 1001, 1001, parseFloat(cylinderAxes[2]), parseFloat(cylinderAxes[3]) ],
                distance: [ 1001, 1001, parseFloat(distance[2]), parseFloat(distance[3]) ],
            }
        }

        if (token) {
            const call = await Api.editUser(data, token);

            return call;
        } else {
            setStorageItem("lenses", data.lenses);

            return {
                success: true
            }
        }
    }

    async loadLens() {
        const { lensId } = this.state;

        const call = await Api.getLens(lensId);

        if (call.lenses) {
            this.setState({ lens: call.lenses });
        }
    }

    changeLens(id) {
        this.setState({ lensId: id }, () => {
            this.loadLens();
        })
    }

    async changeDiopters(diopters) {
        this.setState({ diopters: diopters }, async () => {
            if (this.dioptersSet()) {
                await this.loadLenses();

                this.setState({ modificationStage: 3 });
            }
        });
    }

    async changeCylinder(cylinder) {
        this.setState({ cylinder: cylinder }, async () => {
            if (this.dioptersSet()) {
                await this.loadLenses();

                this.setState({ modificationStage: 3 });
            }
        });
    }

    async changeCylinderAxes(cylinderAxes) {
        this.setState({ cylinderAxes: cylinderAxes }, async () => {
            if (this.dioptersSet()) {
                await this.loadLenses();

                this.setState({ modificationStage: 3 });
            }
        });
    }

    async changeDistance(distance) {
        this.setState({ distance: distance }, async () => {
            if (this.dioptersSet()) {
                await this.loadLenses();

                this.setState({ modificationStage: 3 });
            }
        });
    }

    dioptersSet() {
        const { diopters, cylinder, cylinderAxes, distance, distanceOption, withDiopters } = this.state;

        if (withDiopters === "non-dioptric") return false;

        if (distanceOption === "short") {
            if (cylinder[0] == "1001" && cylinder[1] == "1001") {
                if (diopters[0] != "1001" && diopters[1] != "1001" &&
                    distance[0] != "1001" && distance[1] != "1001") {
                
                    return true;
                }
            } else {
                if (diopters[0] != "1001" && diopters[1] != "1001" &&
                    cylinder[0] != "1001" && cylinder[1] != "1001" &&
                    cylinderAxes[0] != "1001" && cylinderAxes[1] != "1001" &&
                    distance[0] != "1001" && distance[1] != "1001") {
                
                    return true;
                }
            }
        } else {
            if (cylinder[2] == "1001" && cylinder[3] == "1001") {
                if (diopters[2] != "1001" && diopters[3] != "1001" &&
                    distance[2] != "1001" && distance[3] != "1001") {
                
                    return true;
                }
            } else {
                if (diopters[2] != "1001" && diopters[3] != "1001" &&
                    cylinder[2] != "1001" && cylinder[3] != "1001" &&
                    cylinderAxes[2] != "1001" && cylinderAxes[3] != "1001" &&
                    distance[2] != "1001" && distance[3] != "1001") {
                
                    return true;
                }
            }
        }

        return false;
    }

    getAvailable(branch) {
        var color = "";
        var status = "";

        if (branch <= 0) {
            color = colors.red;
            status = "Vypredané";
        } else {
            if (branch <= 5) color = colors.yellow;
            if (branch > 5) color = colors.green;
            
            status = branch + "ks";
        }

        return {
            color: color,
            status: status
        }
    }

    async componentDidMount() {
        await this.loadData();

        this.handleDeviceType();

        hideTransition();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.loadData();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleImageResize);
    }

    showRecipe() {
        var recipe = document.getElementById("recipe");

        recipe.style.display = "flex";
        setTimeout(() => {
            recipe.style.opacity = "1";
        }, 10);
    }

    hideRecipe() {
        var recipe = document.getElementById("recipe");

        recipe.style.opacity = "0";
        setTimeout(() => {
            recipe.style.display = "none";
        }, 310);
    }

    handleTooltip() {
        var t1 = document.getElementById("info-button-1");
        var t2 = document.getElementById("info-button-2");
        var t3 = document.getElementById("info-button-3");
        var tooltip = document.getElementById("tooltip");

        if (t1 && t2 && t3) {
            t1.addEventListener("mouseenter", () => {
                tooltip.innerHTML = tooltipTexts[0];
                tooltip.style.display = "inline-block";
                tooltip.style.left = t1.offsetLeft + "px";
                tooltip.style.top = t1.offsetTop + 35 + "px";
            });

            t1.addEventListener("mouseleave", () => {
                tooltip.style.display = "none";
            });

            t2.addEventListener("mouseenter", () => {
                tooltip.innerHTML = tooltipTexts[1];
                tooltip.style.display = "inline-block";
                tooltip.style.left = t2.offsetLeft + "px";
                tooltip.style.top = t2.offsetTop + 35 + "px";
            });

            t2.addEventListener("mouseleave", () => {
                tooltip.style.display = "none";
            });

            t3.addEventListener("mouseenter", () => {
                tooltip.innerHTML = tooltipTexts[2];
                tooltip.style.display = "inline-block";
                tooltip.style.left = t3.offsetLeft + "px";
                tooltip.style.top = t3.offsetTop + 35 + "px";
            });

            t3.addEventListener("mouseleave", () => {
                tooltip.style.display = "none";
            });
        }
    }

    openGallery(index) {
       if (this.state.product.bonusImages.length === 0) return;

        this.setState({ galleryShowing: true, currentPhoto: index });
    }

    closeGallery() {
        this.setState({ galleryShowing: false, currentImage: 0 }, () => {
            var imageWrapper = document.getElementById("image-wrapper");
            imageWrapper.style.marginLeft = "0px";
        });
    }

    handleDeviceType() {
        const width = window.innerWidth;

        if (width > 1300) {
            this.setState({ device: "computer" });
        } else {
            this.setState({ device: "phone" });
        }
    }

    render() {
        showTransition();
        this.props.router.push("/pripravujeme");

        const product = this.state.product;

        if (product === null) return null;

        return(
            <div className="screen" id="product">
                <div className="body">
                    <div className="left-panel">
                        <div id="image-panel">
                            <div id="image-wrapper">
                                {this.state.images.map((image, index) => (
                                    image ? 
                                        <img
                                            className="image"
                                            src={API_URL + "/uploads/" + image.imagePath}
                                            alt={"Fotka produktu " + product.name}
                                            onClick={() => this.openGallery(index)}
                                            style={{ width: this.state.imageWidth }}
                                        />
                                    :
                                        <div className="placeholder" style={{ width: this.state.imageWidth }} />
                                ))}
                            </div>

                            {this.state.images.length > 1 && <ion-icon name="arrow-back" class="arrow arrow-back" onClick={() => this.changeImage(-1)}></ion-icon>}
                            {this.state.images.length > 1 && <ion-icon name="arrow-forward" class="arrow arrow-forward" onClick={() => this.changeImage(1)}></ion-icon>}
                        </div>

                        {this.state.device === "phone" ?
                        <div id="product-info" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 20 }}>
                            <h2 className="name">{product.name}</h2>
                            <p className="code">KÓD PRODUKTU: {product.eanCode}</p>

                            {this.state.brandImage != null ? <img className="brand-logo" src={this.state.brandImage} alt="Značka" /> : null}

                            <h2 className="price">{(product.price / 100).toFixed(2)}€</h2>

                            {this.state.colorVariants.length > 0 ?
                                <div className="color-variants-panel-computer" id="color-variants-panel">
                                    <div className="summary">
                                        <div className="heading">Farebné varianty</div>

                                        <div className="color-variants">
                                            {this.state.colorVariants.map(variant => (
                                                <Link href={"/obchod/" + variant.link}>
                                                    <a
                                                        className={"item" + (variant.colorCode === this.state.product.colorCode ? " current" : "")}
                                                        onClick={() => showTransition()}
                                                        style={{ margin: 0 }}
                                                    >
                                                        <div className="color">{variant.specs.frameColor}</div>
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="summary" style={{ marginTop: 0 }}>
                                        <div className="heading">Veľkostné varianty</div>

                                        <div className="color-variants size-variants">
                                            {this.state.sizeVariants.map(variant => (
                                                <Link href={"/obchod/" + variant.link}>
                                                    <a
                                                        className={"item" + (variant._id === this.state.product._id ? " current" : "")}
                                                        onClick={() => showTransition()}
                                                        style={{ margin: 0 }}
                                                    >
                                                        <div className="color">{variant.specs.size[0] + "-" + variant.specs.size[1] + "-" + variant.specs.size[2] + "-" + variant.specs.size[3]}</div>
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            : null}
                        </div>
                        : null}

                        <div className="menu-panel">
                            <div className="menu">
                                <div className="item" onClick={() => this.setState({ menu: 1 })} style={this.state.menu === 1 ? { borderBottom: "3px solid rgb(235, 172, 1)" } : null}>POPIS</div>
                                <div className="item" onClick={() => this.setState({ menu: 2 })} style={this.state.menu === 2 ? { borderBottom: "3px solid rgb(235, 172, 1)" } : null}>PARAMETRE</div>
                                <div className="item" onClick={() => this.setState({ menu: 3 })} style={this.state.menu === 3 ? { borderBottom: "3px solid rgb(235, 172, 1)" } : null}>PRISPÔSOBIŤ</div>
                            </div>

                            <div className="content">
                                {this.state.menu === 1 ? <Description product={product} /> : null}
                                {this.state.menu === 2 ? <Parameters product={product} /> : null}
                                {this.state.menu === 3 ? <Modification
                                                            modificationStage={this.state.modificationStage}
                                                            changeLensType={this.changeLensType}
                                                            changeWithDiopters={this.changeWithDiopters}
                                                            changePolarised={this.changePolarised}
                                                            lensType={this.state.lensType}
                                                            withDiopters={this.state.withDiopters}
                                                            polarised={this.state.polarised}

                                                            lenses={this.state.lenses}
                                                            lens={this.state.lens}
                                                            
                                                            diopters={this.state.diopters}
                                                            cylinder={this.state.cylinder}
                                                            cylinderAxes={this.state.cylinderAxes}
                                                            distance={this.state.distance}

                                                            distanceOption={this.state.distanceOption}
                                                            setDistanceShort={() => this.setState({ distanceOption: "short" })}
                                                            setDistanceLong={() => this.setState({ distanceOption: "long" })}

                                                            lensId={this.state.lensId}
                                                            changeLens={this.changeLens}

                                                            dioptersSet={this.dioptersSet}

                                                            changeDiopters={this.changeDiopters}
                                                            changeCylinder={this.changeCylinder}
                                                            changeCylinderAxes={this.changeCylinderAxes}
                                                            changeDistance={this.changeDistance}

                                                            showRecipe={this.showRecipe}
                                                            handleTooltip={this.handleTooltip}

                                                            createCombinedProduct={this.createCombinedProduct}
                                                        /> : null}
                            </div>
                        </div>
                    </div>

                    <div className="right-panel">
                        {this.state.device === "computer" ?
                        <div id="product-info" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <h1 className="name">{product.name}</h1>
                            <div className="code">KÓD PRODUKTU: {product.eanCode}</div>

                            {this.state.brandImage != null ? <img className="brand-logo" src={this.state.brandImage} alt="Značka" /> : null}

                            <h2 className="price">{(product.price / 100).toFixed(2)}€</h2>

                            {this.state.colorVariants.length > 0 ?
                                <div className="color-variants-panel-computer" id="color-variants-panel">
                                    <div className="summary">
                                        <div className="heading">Farebné varianty</div>

                                        <div className="color-variants">
                                            {this.state.colorVariants.map(variant => (
                                                <Link href={"/obchod/" + variant.link}>
                                                    <a
                                                        className={"item" + (variant.colorCode === this.state.product.colorCode ? " current" : "")}
                                                        onClick={() => showTransition()}
                                                        style={{ margin: 0 }}
                                                    >
                                                        <div className="color">{variant.specs.frameColor}</div>
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="summary" style={{ marginTop: 0 }}>
                                        <div className="heading">Veľkostné varianty</div>

                                        <div className="color-variants size-variants">
                                            {this.state.sizeVariants.map(variant => (
                                                <Link href={"/obchod/" + variant.link}>
                                                    <a
                                                        className={"item" + (variant._id === this.state.product._id ? " current" : "")}
                                                        onClick={() => showTransition()}
                                                        style={{ margin: 0 }}
                                                    >
                                                        <div className="color">{variant.specs.size[0] + "-" + variant.specs.size[1] + "-" + variant.specs.size[2] + "-" + variant.specs.size[3]}</div>
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            : null}
                        </div>
                        : null}

                        <div className="summary">
                            <div className="heading">Súhrn</div>

                            <div className="item">
                                <div className="name">{product.name}</div>
                                <div className="price">{(product.price / 100).toFixed(2)}€</div>
                            </div>

                            <div className="item">
                                <div className="name">Dioptrie</div>
                                <div className="price">{this.dioptersSet() ? "Zadané" : "Nezadané"}</div>
                            </div>

                            <div className="item">
                                <div className="name">Šošovky</div>
                                <div className="price">{this.state.lens ? (this.state.lens.name + " - " + ((this.state.lens.price * 2) / 100).toFixed(2) + "€") : "Nezadané"}</div>
                            </div>

                            <div style={{ height: 20 }} />

                            <div className="item">
                                <div className="name">Celková suma</div>
                                <div className="price">{((product.price + (this.state.lens ? (this.state.lens.price * 2) : 0)) / 100).toFixed(2)}€</div>
                            </div>
                        </div>

                        <div className="edit-panel" id="add-to-cart-button">
                            Pridať do košíka
                            <div className="button cart-button" onClick={() => this.createCombinedProduct()}><ion-icon name="cart"></ion-icon>Do košíka</div>
                        </div>

                        <div className="stock-panel">
                            <div className="heading">Dostupnosť</div>

                            <div className="stock">
                                <div className="item">
                                    <div className="store">
                                        <ion-icon name="storefront-outline"></ion-icon>
                                        <div className="indicator" style={{ backgroundColor: this.getAvailable(product.available[1]).color }} />
                                        Centrálny sklad
                                    </div>
                                    <div className="amount" style={{ color: this.getAvailable(product.available[1]).color }}>{this.getAvailable(product.available[1]).status}</div>
                                </div>

                                <div className="item">
                                    <div className="store">
                                        <ion-icon name="storefront-outline"></ion-icon>
                                        <div className="indicator" style={{ backgroundColor: this.getAvailable(product.available[2]).color }} />
                                        Bratislava - Obchodná
                                    </div>
                                    <div className="amount" style={{ color: this.getAvailable(product.available[2]).color }}>{this.getAvailable(product.available[2]).status}</div>
                                </div>

                                <div className="item">
                                    <div className="store">
                                        <ion-icon name="storefront-outline"></ion-icon>
                                        <div className="indicator" style={{ backgroundColor: this.getAvailable(product.available[3]).color }} />
                                        Bratislava - Miletičova
                                        </div>
                                    <div className="amount"  style={{ color: this.getAvailable(product.available[3]).color }}>{this.getAvailable(product.available[3]).status}</div>
                                </div>

                                <div className="item">
                                    <div className="store">
                                        <ion-icon name="storefront-outline"></ion-icon>
                                        <div className="indicator" style={{ backgroundColor: this.getAvailable(product.available[4]).color }} />
                                        Bratislava - Vajnory
                                    </div>
                                    <div className="amount"  style={{ color: this.getAvailable(product.available[4]).color }}>{this.getAvailable(product.available[4]).status}</div>
                                </div>

                                <div className="item">
                                    <div className="store">
                                        <ion-icon name="storefront-outline"></ion-icon>
                                        <div className="indicator" style={{ backgroundColor: this.getAvailable(product.available[5]).color }} />
                                        Bratislava - Vajnorská
                                    </div>
                                    <div className="amount"  style={{ color: this.getAvailable(product.available[5]).color }}>{this.getAvailable(product.available[5]).status}</div>
                                </div>

                                <div className="item">
                                    <div className="store">
                                        <ion-icon name="storefront-outline"></ion-icon>
                                        <div className="indicator" style={{ backgroundColor: this.getAvailable(product.available[6]).color }} />
                                        Senica - OC Branč
                                    </div>
                                    <div className="amount"  style={{ color: this.getAvailable(product.available[6]).color }}>{this.getAvailable(product.available[6]).status}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.popup ? (
                    <Popup
                        loading={this.state.loading}
                        title={this.state.message}
                        close={this.state.onPopupClose}
                        secondButtonClose={this.state.secondButtonClose}
                    />
                ) : null}

                {this.state.panel ? (
                    <Panel
                        product={this.state.product}
                        lens={this.state.lens}
                        specs={this.state.specs}
                        onClose={() => this.setState({ panel: false })}
                    />
                ) : null}

                {this.state.galleryShowing ?
                    <Gallery gallery={this.state.gallery} currentPhoto={this.state.currentPhoto} close={this.closeGallery} />
                : null}

                <div id="tooltip">
                    
                </div>

                <div id="recipe" onClick={() => this.hideRecipe()}>
                    <img className="image" src={require("../assets/recept-na-okuliare.png")} alt="Recept na okuliare" />
                </div>
            </div>
        )
    }
}

function Modification(props) {
    const lenses = props.lenses;
    
    var diopters = props.diopters;
    var cylinder = props.cylinder;
    var cylinderAxes = props.cylinderAxes;
    var distance = props.distance;

    const distanceOption = props.distanceOption;

    useEffect(() => {
        props.handleTooltip();
    });

    return(
        <div className="modification" id="product-edit-panel">
            {props.modificationStage >= 1 ?
            <div className="section" id="section-1">
                <div className="title"><div className="step">1</div>Typ šošoviek</div>

                <div className="normal-grid">
                    <div
                        className="item"
                        style={props.withDiopters === "dioptric" ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                        onClick={() => props.changeWithDiopters("dioptric")}
                    >
                        <img className="icon" src={require("../assets/icons/dioptricke.svg")} alt="Dioptrické okuliare ikona" />
                        <div className="heading">Dioptrické</div>
                    </div>
                    <div
                        className="item"
                        style={props.withDiopters === "non-dioptric" ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                        onClick={() => props.changeWithDiopters("non-dioptric")}
                    >
                        <img className="icon" src={require("../assets/icons/nedioptricke.svg")} alt="Nedioptrické okuliare ikona" />
                        <div className="heading">Nedioptrické</div>
                    </div>
                    <div
                        className="item"
                        style={props.withDiopters === "no-lens" ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                        onClick={() => props.changeWithDiopters("no-lens")}
                    >
                        <img className="icon" src={require("../assets/icons/iba-ram.svg")} alt="Iba rám ikona" />
                        <div className="heading">Iba rám</div>
                    </div>
                </div>
            </div>
            : null}

            {props.modificationStage >= 2 ?
            <div className="section" id="section-2">
                <div className="title"><div className="step">2</div>Typ skiel</div>

                <div className="normal-grid">
                    <div
                        className="item"
                        style={props.lensType === "číre" ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                        onClick={() => props.changeLensType("číre")}
                    >
                        <img className="icon" src={require("../assets/icons/cire.svg")} alt="Číre sklá na okuliare ikona" />
                        <div className="heading">Číre</div>
                    </div>

                    <div
                        className="item"
                        style={props.lensType === "fotochromatické" ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                        onClick={() => props.changeLensType("fotochromatické")}
                    >
                        <img className="icon" src={require("../assets/icons/fotochromaticke.svg")} alt="Fotochromatické sklá na okuliare ikona" />
                        <div className="heading">Fotochromatické</div>
                    </div>

                    <div
                        className="item"
                        style={props.lensType === "slnečné" ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                        onClick={() => props.changeLensType("slnečné")}
                    >
                        <img className="icon" src={require("../assets/icons/slnecne.svg")} alt="Slnečné sklá na okuliare ikona" />
                        <div className="heading">Slnečné</div>
                    </div>
                </div>

                {props.lensType === "slnečné" ? <div style={{ height: 20 }} /> : null}

                {props.lensType === "slnečné" ?
                    <div className="normal-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                        <div
                            className="item"
                            style={props.polarised === true ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                            onClick={() => props.changePolarised(true)}
                        >
                            <img className="icon" src={require("../assets/icons/polarizovane.svg")} alt="Polarizované slnečné sklá na okuliare ikona" />
                            <div className="heading">Polarizované</div>
                        </div>
                        <div
                            className="item"
                            style={props.polarised === false ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                            onClick={() => props.changePolarised(false)}
                        >
                            <img className="icon" src={require("../assets/icons/nepolarizovane.svg")} alt="Nepolarizované slnečné sklá na okuliare ikona" />
                            <div className="heading">Nepolarizované</div>
                        </div>
                    </div>
                : null}
            </div>
            : null}

            {props.modificationStage >= 3 && props.withDiopters === "dioptric" ?
            <div className="section" id="section-3">
                <div className="title"><div className="step">3</div>Dioptrie</div>

                <div className="normal-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                    <div
                        className="item"
                        style={distanceOption === "short" ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                        onClick={props.setDistanceShort}
                    >
                        <img className="icon" src={require("../assets/icons/do-blizky.svg")} alt="Okuliare do blízky ikona" />
                        <div className="heading">Do blízky</div>
                    </div>
                    <div
                        className="item"
                        style={distanceOption === "long" ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}
                        onClick={props.setDistanceLong}
                    >
                        <img className="icon" src={require("../assets/icons/do-dialky.svg")} alt="Okuliare do diaľky ikona" />
                        <div className="heading">Do diaľky</div>
                    </div>
                </div>

                <div style={{ height: 20 }} />
                
                {props.distanceOption !== "" ?
                <div className="grid">
                    <div />
                    <div className="heading">
                        SPH
                        <div className="info-button" id="info-button-1"><ion-icon name="information-circle-outline"></ion-icon></div>
                    </div>
                    <div className="heading">
                        CYL
                        <div className="info-button" id="info-button-2"><ion-icon name="information-circle-outline"></ion-icon></div>
                    </div>
                    <div className="heading">
                        AX
                        <div className="info-button" id="info-button-3"><ion-icon name="information-circle-outline"></ion-icon></div>
                    </div>

                    <div className="heading">Pravé oko</div>

                    <select className="field" value={distanceOption === "short" ? diopters[0] : diopters[2]} onChange={(event) => {
                        if (distanceOption === "short") {
                            diopters[0] = event.target.value === "-" ? "1001" : event.target.value;
                        } else {
                            diopters[2] = event.target.value === "-" ? "1001" : event.target.value;
                        }

                        props.changeDiopters(diopters);
                    }}>
                        {diopterValues().map((value) => <option value={value}>{value === "-" ? value : value.toFixed(2)}</option>)}
                    </select>

                    <select className="field" value={distanceOption === "short" ? cylinder[0] : cylinder[2]} onChange={(event) => {
                        if (distanceOption === "short") {
                            cylinder[0] = event.target.value === "-" ? "1001" : event.target.value;
                        } else {
                            cylinder[2] = event.target.value === "-" ? "1001" : event.target.value;
                        }

                        props.changeCylinder(cylinder);
                    }}>
                        {cylinderValues().map((value) => <option value={value}>{value === "-" ? value : value.toFixed(2)}</option>)}
                    </select>

                    <select className="field" value={distanceOption === "short" ? cylinderAxes[0] : cylinderAxes[2]} onChange={(event) => {
                        if (distanceOption === "short") {
                            cylinderAxes[0] = event.target.value === "-" ? "1001" : event.target.value;
                        } else {
                            cylinderAxes[2] = event.target.value === "-" ? "1001" : event.target.value;
                        }

                        props.changeCylinderAxes(cylinderAxes);
                    }}>
                        {cylinderAxisValues().map((value) => <option value={value}>{value}</option>)}
                    </select>

                    <div className="heading">Ľavé oko</div>

                    <select className="field" value={distanceOption === "short" ? diopters[1] : diopters[3]} onChange={(event) => {
                        if (distanceOption === "short") {
                            diopters[1] = event.target.value === "-" ? "1001" : event.target.value;
                        } else {
                            diopters[3] = event.target.value === "-" ? "1001" : event.target.value;
                        }

                        props.changeDiopters(diopters);
                    }}>
                        {diopterValues().map((value) => <option value={value}>{value === "-" ? value : value.toFixed(2)}</option>)}
                    </select>

                    <select className="field" value={distanceOption === "short" ? cylinder[1] : cylinder[3]} onChange={(event) => {
                        if (distanceOption === "short") {
                            cylinder[1] = event.target.value === "-" ? "1001" : event.target.value;
                        } else {
                            cylinder[3] = event.target.value === "-" ? "1001" : event.target.value;
                        }

                        props.changeCylinder(cylinder);
                    }}>
                        {cylinderValues().map((value) => <option value={value}>{value === "-" ? value : value.toFixed(2)}</option>)}
                    </select>

                    <select className="field" value={distanceOption === "short" ? cylinderAxes[1] : cylinderAxes[3]} onChange={(event) => {
                        if (distanceOption === "short") {
                            cylinderAxes[1] = event.target.value === "-" ? "1001" : event.target.value;
                        } else {
                            cylinderAxes[3] = event.target.value === "-" ? "1001" : event.target.value;
                        }

                        props.changeCylinderAxes(cylinderAxes);
                    }}>
                        {cylinderAxisValues().map((value) => <option value={value}>{value}</option>)}
                    </select>
                </div>
                : null}

                {props.distanceOption !== "" ?
                <div className="chooser">
                    <div className="item">
                        <div className="heading">Viem, aká je moja vzdialenosť zorníc (PD)</div>

                        <div className="grid">
                            <div className="heading">Pravé oko</div>

                            <select className="field" value={distanceOption === "short" ? distance[0] : distance[2]} onChange={(event) => {
                                if (distanceOption === "short") {
                                    distance[0] = event.target.value === "-" ? "1001" : event.target.value;
                                } else {
                                    distance[2] = event.target.value === "-" ? "1001" : event.target.value;
                                }

                                props.changeDistance(distance);
                            }}>
                                {distanceValues().map((value) => <option value={value}>{value}</option>)}
                            </select>

                            <div className="heading">Ľavé oko</div>

                            <select className="field" value={distanceOption === "short" ? distance[1] : distance[3]} onChange={(event) => {
                                if (distanceOption === "short") {
                                    distance[1] = event.target.value === "-" ? "1001" : event.target.value;
                                } else {
                                    distance[3] = event.target.value === "-" ? "1001" : event.target.value;
                                }

                                props.changeDistance(distance);
                            }}>
                                {distanceValues().map((value) => <option value={value}>{value}</option>)}
                            </select>
                        </div>
                    </div>

                    <div style={{ width: 20 }} />

                    <div className="item" onClick={() => props.showRecipe()} style={{ cursor: "pointer" }}>
                        <div className="heading">Nepoznám svoju vzdialenosť zorníc (PD)</div>
                        <p>Pozrite si prototyp receptu s hodnotami PD.</p>
                        <div style={{ flex: 1 }} />
                        <div className="button" style={{ alignSelf: "flex-start", marginTop: 10 }}>Zobraziť recept</div>
                    </div>
                </div>
                : null}
            </div>
            : null}

            {props.modificationStage >= 3 && ((props.withDiopters === "dioptric" && props.dioptersSet()) || props.withDiopters === "non-dioptric") ?
            <div className="section" id="section-4">
                <div className="title">
                    <div className="step">{props.withDiopters === "dioptric" ? "4" : "3"}</div>
                    Šošovky
                </div>

                {lenses.length === 0 ? <div className="message">Nenašli sa žiadne šošovky</div> :
                <div className="chooser">
                    {lenses.map((lens) => {
                        return(
                            <div className="item" onClick={() => props.changeLens(lens._id)} style={props.lensId === lens._id ? { backgroundColor: "rgba(0, 0, 0, 0.15)" } : null}>
                                <div className="heading">{lens.name}</div>
                                <div className="image" />
                                <div className="info">{lens.color}</div>
                                <div className="info">Dioptrie od {lens.dioptersRange[0]} do +{lens.dioptersRange[1]}</div>
                                <div className="info">Cylinder od {lens.cylinderRange[0]} do +{lens.cylinderRange[1]}</div>
                                
                                <div className="price">+ {(lens.price / 100).toFixed(2)}€</div>
                            </div>
                        )
                    })}
                </div>
                }
            </div>
            : null}

            {props.modificationStage >= 3 && props.dioptersSet() && props.lens !== null ?
                <div className="button" onClick={() => props.createCombinedProduct()}>Pridať do košíka</div>
            : null}
        </div>
    )
}

const Description = (props) => {
    return <div className="text">{props.product.description}</div>;
}

const Parameters = (props) => {

    var sex = "-";

    if (props.product.specs.sex === "M") sex = "Pánske";
    if (props.product.specs.sex === "W") sex = "Dámske";
    if (props.product.specs.sex === "U") sex = "Unisex";

    return (
        <div className="parameters">
            <div className="specs">
                <div className="column">
                    <div className="heading">Model</div>
                    <div className="info">{props.product.eanCode}</div>

                    <div className="heading">Kolekcia</div>
                    <div className="info">{sex}</div>

                    <div className="heading">Veľkosť</div>
                    <div className="info">{props.product.specs.size && props.product.specs.size[0] && props.product.specs.size[1] && props.product.specs.size[2] && props.product.specs.size[3] ? props.product.specs.size[0] + "mm, " + props.product.specs.size[1] + "mm, " + props.product.specs.size[2] + "mm, " + props.product.specs.size[3] + "mm" : "-"}</div>
                </div>

                <div className="column" style={{ marginRight: 0 }}>
                    {/*
                    <div className="heading">Farba šošoviek</div>
                    <div className="info">{props.product.specs.lensColor || "-"}</div>
                    */}

                    <div className="heading">Farba rámu</div>
                    <div className="info">{props.product.specs.frameColor || "-"}</div>

                    <div className="heading">Materiál rámu</div>
                    <div className="info">{props.product.specs.frameMaterial || "-"}</div>

                    <div className="heading">Tvar rámu</div>
                    <div className="info">{props.product.specs.frameStyle || "-"}</div>
                </div>
            </div>

            {props.product.specs.size && props.product.specs.size[0] && props.product.specs.size[1] && props.product.specs.size[2] && props.product.specs.size[3] &&
            <div className="sizes">
                <div className="item">
                    <img className="image" src={require("../assets/size-1.svg")} alt="Veľkosť okuliarov" />
                    <div className="info">{props.product.specs.size[0]}mm</div>
                </div>
                <div className="item">
                    <img className="image" src={require("../assets/size-2.svg")} alt="Veľkosť okuliarov" />
                    <div className="info">{props.product.specs.size[1]}mm</div>
                </div>
                <div className="item">
                    <img className="image" src={require("../assets/size-3.svg")} alt="Veľkosť okuliarov" />
                    <div className="info">{props.product.specs.size[2]}mm</div>
                </div>
                <div className="item">
                    <img className="image" src={require("../assets/size-4.svg")} alt="Veľkosť okuliarov" />
                    <div className="info">{props.product.specs.size[3]}mm</div>
                </div>
            </div>
            }
        </div>
    );
}

export default withRouter(Product);