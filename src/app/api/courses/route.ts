import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'src/data/courses');
    
    // Check if directory exists
    if (!fs.existsSync(dataDirectory)) {
      return NextResponse.json([], { status: 200 });
    }

    const filenames = fs.readdirSync(dataDirectory);
    
    const courses = filenames
      .filter(filename => filename.endsWith('.json'))
      .map(filename => {
        const filePath = path.join(dataDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
      });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error reading course files:', error);
    return NextResponse.json({ error: 'Failed to load courses' }, { status: 500 });
  }
}
