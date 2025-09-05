"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PostPage({ params }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { slug } = await params;
            const res = await fetch(`/api/posts/${slug}`);
            const data = await res.json();
            setPost(data);
            setLoading(false);
        };
        fetchPost();
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 font-medium">Loading post...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-gray-400 text-8xl mb-6">😕</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h2>
                    <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
                    <Link href="/home">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
                            ← Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Navigation */}
                <div className="mb-10">
                    <Link href="/home" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Posts
                    </Link>
                </div>

                {/* Post Content */}
                <article className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Post Header */}
                    <div className="px-10 py-8 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
                        <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6"></div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    {/* Post Body */}
                    <div className="px-10 py-12">
                        <div className="prose prose-lg max-w-none">
                            <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
                                {post.content}
                            </div>
                        </div>
                    </div>

                    {/* Post Footer */}
                    <div className="px-10 py-8 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-6 sm:space-y-0">
                            <div className="flex items-center text-gray-600">
                                <span className="text-2xl mr-3">📚</span>
                                <p className="font-medium">Thanks for reading!</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/post">
                                    <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Write Post
                                    </button>
                                </Link>
                                <Link href="/home">
                                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                                        All Posts
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Continue Reading Section */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Continue Reading</h2>
                    <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
                        <div className="text-6xl mb-6">📖</div>
                        <p className="text-xl text-gray-600 mb-8">Discover more amazing posts from our community</p>
                        <Link href="/home">
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                                Browse All Posts
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}