import React from "react";
import { Link } from "react-router-dom";

export default () => (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
                <h1 className="display-4">Reels</h1>
                <p className="lead">
                    Creative Agency User want to create a new show reel from a collection of clips in order
                        to present my agency commercials to the advertiser
                </p>
                <hr className="my-4" />
                <Link
                    to="/reels"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    View Reels
                </Link>
            </div>
        </div>
    </div>
);