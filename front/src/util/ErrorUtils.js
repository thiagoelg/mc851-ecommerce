export const treatError = (props, error) => {
    if(!error) {
        props.history.push("/error");
        return;
    }

    const response = error.response;
    if(!response || !response.status) {
        props.history.push("/error");
        return;
    }

    if(response.status === 500 || response.status === 503) {
        props.history.push("/500");
        return;
    }

    if(response.status === 404) {
        props.history.push("/404");
        return;
    }

    if(response.status === 403) {
        props.history.push("/403");
        return;
    }

    props.history.push("/error");
};