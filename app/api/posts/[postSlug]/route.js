import connectionDatabase from "@/lib/mogoose";
import Post from '@/model/post';
import { NextResponse } from 'next/server'; 

export async function GET(request,{params}) {
    await connectionDatabase();
    try {
        const { postSlug } = await params;
        console.log("postSlug:", postSlug); // Debugging line
        const post = await Post.findOne({ slug: postSlug });
        if (!post) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ message: 'Error fetching post' }, { status: 500 });
    }
}
