'use client'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';


export default function ProyectoDetalle({archivo}) {
  //const { currentUser } = useUser() as any

  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(archivo)
      .then(res => res.text())
      .then(setContent)
      .catch(err => console.error('Error al cargar el archivo MD:', err));
  }, [archivo]);
  return (
   <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
