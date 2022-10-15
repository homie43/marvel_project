import React from 'react';

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
    return (
        <>
            <AppBanner/>
            <ComicsList/>
        </>
    );
};

export default ComicsPage;