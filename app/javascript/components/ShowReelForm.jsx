import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShowReelForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [videoStandard, setVideoStandard] = useState('');
    const [videoDefinition, setVideoDefinition] = useState('');
    const [clips, setClips] = useState([]);
    const [clipName, setClipName] = useState('');
    const [clipDuration, setClipDuration] = useState('');
    const [clipDesc, setClipDesc] = useState('');

    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
    };

    const addClip = () => {
        if (clipName && clipDuration && clipDesc) {
            // Validate duration format (HH:MM:ss:ff)
            const durationRegex = /^(\d{2}):(\d{2}):(\d{2}):(\d{2})$/;
            if (!durationRegex.test(clipDuration)) {
                console.error('Invalid duration format. Please enter duration in HH:MM:ss:ff format.');
                return;
            }

            // Validate duration values
            const [hours, minutes, seconds, frames] = clipDuration.split(':').map(Number);
            if (hours >= 24 || minutes >= 60 || seconds >= 60 || frames >= 25) {
                console.error('Invalid duration values. Please ensure the duration is within valid ranges.');
                return;
            }

            setClips([...clips, { name: clipName, duration: clipDuration, description: clipDesc }]);
            setClipName('');
            setClipDuration('');
            setClipDesc('');
        }
    };

    const removeClip = (index) => {
        const updatedClips = [...clips];
        updatedClips.splice(index, 1);
        setClips(updatedClips);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const url = "/api/v1/reels/create";

        if (name.length == 0 || videoStandard.length == 0 || videoDefinition.length == 0 || clips.length == 0)
            return;

        const body = {
            name,
            videoStandard,
            videoDefinition,
            clips,
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((response) => navigate(`/reels`))
            .catch((error) => console.log(error.message));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">
                        Add a new reel
                    </h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="reelName">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="reelName"
                                className="form-control"
                                required
                                value={name}
                                onChange={(event) => onChange(event, setName)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="videoStandard">Video Standard</label>
                            <input
                                type="text"
                                name="videoStandard"
                                id="videoStandard"
                                className="form-control"
                                required
                                value={videoStandard}
                                onChange={(event) => onChange(event, setVideoStandard)}
                            />
                        </div>
                        <label htmlFor="videoDefinition">Video Definition</label>
                        <input
                            type="text"
                            name="setVideoDefinition"
                            id="setVideoDefinition"
                            className="form-control"
                            required
                            value={videoDefinition}
                            onChange={(event) => onChange(event, setVideoDefinition)}
                        />
                        <div className="form-group">
                            <label htmlFor="clipName">Clip Name</label>
                            <input
                                type="text"
                                name="clipName"
                                id="clipName"
                                className="form-control"
                                value={clipName}
                                onChange={(event) => onChange(event, setClipName)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clipDesc">Clip Description</label>
                            <input
                                type="text"
                                name="clipDesc"
                                id="clipDesc"
                                className="form-control"
                                value={clipDesc}
                                onChange={(event) => onChange(event, setClipDesc)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clipDuration">Clip Duration</label>
                            <input
                                type="text"
                                name="clipDuration"
                                id="clipDuration"
                                className="form-control"
                                value={clipDuration}
                                onChange={(event) => onChange(event, setClipDuration)}
                            />
                        </div>
                        <button type="button" className="btn custom-button mt-3" onClick={addClip}>
                            Add Clip
                        </button>
                        <div>
                            {clips.map((clip, index) => (
                                <div key={index} className="mt-3">
                                    <span>{clip.name} - Duration: {clip.duration}</span>
                                    <button type="button" className="btn btn-sm btn-danger ml-2"
                                            onClick={() => removeClip(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="btn custom-button mt-3">
                            Create Reel
                        </button>
                        <Link to="/reels" className="btn btn-link mt-3">
                            Back to reels
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShowReelForm;
