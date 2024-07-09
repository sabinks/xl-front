"use client"
import React, { useState } from 'react'
import { Input } from '@/components';
import Editor from '@/components/editor'


export default function NewLetterForm({ state, setState, error }: any) {
    const onEditorContentChanged = (content: any) => {
        setState((prev: any) => ({ ...prev, content: `${content.html}` }))
    };
    return (
        <div className='space-y-2'>
            <Input
                name='name'
                label='Newsletter Name/Subject'
                type="text"
                value={state?.name}
                onChange={(e: any) => setState({ ...state, name: e.target.value })}
            />
            <p className='text-red-400 text-sm'>{error?.name}</p>

            <label className="block text-sm font-semibold text-gray-700 ">Content</label>
            <Editor
                value={state?.content ? state?.content : ""}
                onChange={onEditorContentChanged}
                defaultValue={state?.content}
            />
            <p className='text-red-400 text-sm'>{error?.content}</p>

        </div>
    )
}
