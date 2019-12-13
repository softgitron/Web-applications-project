import { connect } from "react-redux";

import { getSearchResults } from "../actionCreators/getSearch";
import search from "../pages/search";

const mapStateToProps = state => {
    return {
        results: state.getSearchReducer.results,
        message: state.getSearchReducer.message,
        fetching: state.getSearchReducer.isFetching
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getSearchResults: query => {
            dispatch(getSearchResults(query));
        }
    };
};
const _connect = connect(mapStateToProps, mapDispatchToProps);

export default _connect(search);
