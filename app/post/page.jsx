"use client"
import { useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function CreatePost() {
    const [post, setPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!post.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!post.content.trim()) {
            newErrors.content = 'Content is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createPost = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: post.title.trim(),
                    content: post.content.trim()
                }),
            });
            const data = await res.json();
            
            // Redirect to homepage after successful creation
            console.log("Post created:", data);
           
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
            redirect('/home');
        }
    };

    const handleInputChange = (field, value) => {
        setPost({ ...post, [field]: value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Link href="/home" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors font-medium">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Create New Post
                    </h1>
                    <p className="text-xl text-gray-600">Share your thoughts with the world</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                        {/* Title Input */}
                        <div>
                            <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-3">
                                Post Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter an engaging title..."
                                className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 text-lg ${
                                    errors.title 
                                        ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                                        : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                                }`}
                                value={post.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                disabled={loading}
                            />
                            {errors.title && (
                                <p className="mt-2 text-red-600 font-medium">{errors.title}</p>
                            )}
                        </div>

                        {/* Content Textarea */}
                        <div>
                            <label htmlFor="content" className="block text-lg font-semibold text-gray-700 mb-3">
                                Post Content *
                            </label>
                            <textarea
                                id="content"
                                placeholder="Write your content here..."
                                rows={10}
                                className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 text-lg resize-vertical ${
                                    errors.content 
                                        ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                                        : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                                }`}
                                value={post.content}
                                onChange={(e) => handleInputChange('content', e.target.value)}
                                disabled={loading}
                            />
                            {errors.content && (
                                <p className="mt-2 text-red-600 font-medium">{errors.content}</p>
                            )}
                            <p className="mt-2 text-gray-500">
                                {post.content.length} characters
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="button"
                                onClick={createPost}
                                disabled={loading || !post.title.trim() || !post.content.trim()}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 disabled:transform-none disabled:hover:scale-100 flex items-center justify-center shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                        Creating Post...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create Post
                                    </>
                                )}
                            </button>
                            <Link href="/home" className="sm:w-auto">
                                <button
                                    type="button"
                                    disabled={loading}
                                    className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-2xl transition duration-300 shadow-lg"
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Tips */}
                <div className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8">
                    <h3 className="font-bold text-blue-900 mb-4 text-xl flex items-center">
                        <span className="text-2xl mr-3">💡</span>
                        Writing Tips
                    </h3>
                    <ul className="text-blue-800 space-y-2">
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Make your title clear and engaging
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Use proper formatting and paragraph breaks
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Keep your content informative and valuable
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}