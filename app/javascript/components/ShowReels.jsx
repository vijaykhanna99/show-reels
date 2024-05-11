import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShowReels = () => {
    const navigate = useNavigate();
    const [reels, setReels] = useState([]);

    useEffect(() => {
        const url = "/api/v1/reels/index";
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => setReels(res))
            .catch(() => navigate("/"));
    }, []);

    const deleteRecipe = () => {
        const url = `/api/v1/destroy/${params.id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(() => navigate("/reels"))
            .catch((error) => console.log(error.message));
    };

    const allReels = reels.map((reel, index) => (
        <div key={index} className="col-md-6 col-lg-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{reel.name}</h5>
                    <p>Total Duration: {reel.total_duration}</p>
                    <ul>
                        {reel.video_clips.map(clip => (
                            <li key={clip.id}>
                                {clip.name} - Duration: {clip.duration}
                            </li>
                        ))}
                    </ul>
                    <div className="col-sm-12 col-lg-2">
                        <button
                            type="button"
                            className="btn btn-danger"
                        >
                            Delete Reel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ));
    const noReel = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
                No Reels yet. Why not <Link to="/new_reel">create one</Link>
            </h4>
        </div>
    );

    return (
        <>
            <section className="jumbotron jumbotron-fluid text-center">
                <div className="container py-5">
                    <h1 className="display-4">Reels</h1>
                </div>
            </section>
            <div className="py-5">
                <main className="container">
                    <div className="text-end mb-3">
                        <Link to="/new_reel" className="btn custom-button">
                            Create New Reel
                        </Link>
                    </div>
                    <div className="row">
                        {reels.length > 0 ? allReels : noReel}
                    </div>
                    <Link to="/" className="btn btn-link">
                        Home
                    </Link>
                </main>
            </div>
        </>
    );
};

export default ShowReels;