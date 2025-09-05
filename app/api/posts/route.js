import connectionDatabase from '../../../lib/mogoose';
import Post from '@/model/post';
import { NextResponse } from 'next/server';


export async function GET() {
    await connectionDatabase();

    try {
        const posts = await Post.find({});
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
    }
}

export async function POST(request) {
    await connectionDatabase();

    const { title, content } = await request.json();

    if (!title || !content ) {
        return NextResponse.json({ message: 'Both title and content are required' }, { status: 400 });
    }

    try {
        const newPost = new Post({ title, content, slug: title.toLowerCase().replace(/ /g, '-') });
        await newPost.save();
        return NextResponse.json({message: 'Post created successfully', newPost}, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error );
        if (error.code === 11000) {
            return NextResponse.json({ message: 'A post with this slug already exists' }, { status: 409 });
        }
        return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
    }
}