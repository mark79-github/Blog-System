import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Details from "../../components/Details";

const DetailsPage = ({match}) => {
    return (
        <>
            <Header/>
            <Details match={match}/>
            <Footer/>
        </>

    );
}

export default DetailsPage;