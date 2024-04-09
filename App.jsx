import React, { useState } from "react";
import { Button, Carousel, Form, Input } from "antd";

export default function App() {
    const [tracks, setTracks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(5);
    
    async function fetchData() {
        const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';
        const url = `${baseURL}?q=${searchTerm}&type=track&limit=${limit}`;
        const request = await fetch(url);
        const data = await request.json();
        console.log(data);
        setTracks(data.id);
        setSearchTerm(data.artist);
        setLimit(data);
    }

    async function trackToJSX(trackJSON) {
        return (
            <div key={trackJSON.id}>
                <img src={albumJSON.image_url} />
                <h3>{trackJSON.name}</h3>
            </div>
        )
    }

    async function display() {
        fetchData();
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                >
                <Form.Item
                    label="Search Term"
                    name="searchTerm"
                    rules={[
                        {
                        required: true,
                        message: "Enter a search term"
                        },
                    ]}
                    >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Limit"
                    name="limit"
                    rules={[
                        {
                            required: true,
                            message: "Enter the number of tracks you want (max of 20)"
                            },
                        ]}
                        >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={display}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Carousel dotPosition="top">
                {/* tracks.map(trackToJSX) */}
                <iframe
                key={tracks.id}
                src="https://open.spotify.com/embed/track/${key}?utm_source=generator" 
                width="100%" 
                border="0"
                height="352" 
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"></iframe>
            </Carousel>
        </div>
    )
}