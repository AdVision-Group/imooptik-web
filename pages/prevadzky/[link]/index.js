import Head from 'next/head';
import Branch from "../../../screens/Branch";
import Api from "../../../config/Api";
import { branches } from "../../../config/Database";

export default function BranchScreen({ branch, services }) {
    const branchData = JSON.parse(branch);

    return (
        <div>
            <Head>
                <title>IMOOPTIK | {branchData.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Branch branch={branch} services={services} />
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { link } = query;

    var branch = null;
    var services = null;

    for (let i = 0; i < branches.length; i++) {
        if (branches[i].link === link) {
            branch = branches[i];
            break;
        }
    }

    if (branch) {
        const call = await Api.calendars();

        if (call.calendars) {
            const calendars = call.calendars;

            for (let i = 0; i < calendars.length; i++) {
                if (calendars[i].premises === branch.calendar) {
                    services = calendars[i].bookings;
                    break;
                }
            }
        }
    }

    console.log(services);

    return {
        props: {
            branch: JSON.stringify(branch),
            services: JSON.stringify(services)
        }
    }
}