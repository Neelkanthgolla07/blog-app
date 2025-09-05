"use client"
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/posts');
            const data = await res.json();
            setPosts(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handlePostClick = (slug) => {
        redirect(`/post/${slug}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 font-medium">Loading posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl p-1 font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome to Our Blog
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Discover amazing stories, insights, and ideas from our community of writers
                    </p>
                    <Link href="/post">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl">
                            ✨ Create New Blog Post
                        </button>
                    </Link>
                </div>

                {/* Posts Grid */}
                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-8xl mb-6">📝</div>
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">No posts yet</h2>
                        <p className="text-gray-500 mb-8 text-lg">Be the first to share your thoughts with the world!</p>
                        <Link href="/post">
                            <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                                Write Your First Post
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article
                                key={post._id}
                                onClick={() => handlePostClick(post.slug)}
                                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="p-8">
                                    <div className="mb-4">
                                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                            { 'Recent'}
                                        </span>
                                        <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors flex items-center">
                                            Read more 
                                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
