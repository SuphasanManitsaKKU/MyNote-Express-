"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import React from 'react';

export default function Card({ title: initialTitle, content: initialContent, cardColor: initialCardColor }: { title: string, content: string, cardColor: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [cardColor, setCardColor] = useState(initialCardColor); // ตั้งค่าสีพื้นหลังเริ่มต้นเป็นสีขาว
    const [selectedColor, setSelectedColor] = useState('bg-white'); // สถานะสำหรับสีที่เลือก

    const contentTextareaRef = useRef<HTMLTextAreaElement>(null); // ใช้ ref สำหรับช่องกรอกเนื้อหา

    function handleDelete(event: React.MouseEvent) {
        event.stopPropagation(); // ป้องกันการคลิกจากการแพร่กระจายไปยัง event ของ card
        Swal.fire({
            title: "Do you want to delete this note?",
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: `Delete`,
            cancelButtonText: `Cancel`
        }).then((result) => {
            if (result.isDenied) {
                Swal.fire({
                    icon: "success",
                    title: "Deleted",
                    showConfirmButton: true,
                    timer: 1500
                }).then(() => {
                    setIsEditing(false); // ออกจากโหมดแก้ไขเมื่อยืนยันการลบ
                });
            }
        });
    }

    function handleEditMode() {
        setIsEditing(true);
    }

    function handleCancel() {
        setIsEditing(false);
    }

    function handleClickOutside(event: React.MouseEvent) {
        if (event.target instanceof HTMLElement) {
            const target = event.target as HTMLElement;
            if (!target.closest('.card-content') && !target.closest('.delete-btn')) {
                setIsEditing(false);
            }
        }
    }

    function handleColorChange(color: string) {
        setCardColor(color); // เปลี่ยนสีของการ์ดตามที่เลือก
        setSelectedColor(color); // ตั้งค่าสีที่เลือก
    }

    useEffect(() => {
        if (isEditing && contentTextareaRef.current) {
            const textarea = contentTextareaRef.current;
            textarea.focus(); // ตั้งโฟกัสไปที่ช่องกรอกเนื้อหาเมื่อเข้าสู่โหมดแก้ไข
            textarea.setSelectionRange(textarea.value.length, textarea.value.length); // เลื่อนไปที่ตำแหน่งสุดท้ายของเนื้อหา
        }
    }, [isEditing]);

    return (
        <div>
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClickOutside} />
            )}
            <div
                className={`border border-gray-300 rounded-lg shadow-md p-6 m-4 ${cardColor} card-content ${isEditing ? 'fixed inset-1/4 w-1/2 h-1/2 z-50 transform scale-105' : ''}`}
                onClick={handleEditMode}
            >
                {!isEditing ? (
                    <>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
                        <hr className="mb-4" />
                        <p className="text-gray-600">{content}</p>
                        <div className='flex justify-end delete-btn'>
                            <Image
                                width={25}
                                height={25}
                                src="/deletetrash.png"
                                alt="Delete Trash"
                                onClick={handleDelete}
                            />
                        </div>
                    </>
                ) : (
                    <div className='flex flex-col h-full'>
                        <div className='flex-grow'>
                            <div className='grid grid-cols-[3fr_1fr] gap-4 items-center'>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border-none bg-transparent outline-none mb-4"
                                    placeholder="Title"
                                />
                                <p className='text-gray-400 text-xs text-right'>14:14 25 Aug 2024</p>
                            </div>

                            <hr />
                            <textarea
                                ref={contentTextareaRef} // กำหนด ref ให้กับช่องกรอกเนื้อหา
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-full border-none bg-transparent outline-none resize-none"
                                placeholder="Content"
                            />
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <div className='flex gap-2 border p-2 rounded-2xl bg-white'>
                                <button
                                    className={`w-6 h-6 rounded-full border ${selectedColor === 'bg-white' ? 'border-black' : ''} bg-white`}
                                    onClick={() => handleColorChange('bg-white')}
                                    aria-label="White"
                                />
                                <button
                                    className={`w-6 h-6 rounded-full border ${selectedColor === '#B3E5FC' ? 'border-black' : ''} bg-[#B3E5FC]`}
                                    onClick={() => handleColorChange('bg-[#B3E5FC]')}
                                    aria-label="Light Blue"
                                />
                                <button
                                    className={`w-6 h-6 rounded-full border ${selectedColor === '#B9FBC0' ? 'border-black' : ''} bg-[#B9FBC0]`}
                                    onClick={() => handleColorChange('bg-[#B9FBC0]')}
                                    aria-label="Light Green"
                                />
                                <button
                                    className={`w-6 h-6 rounded-full border ${selectedColor === '#FFABAB' ? 'border-black' : ''} bg-[#FFABAB]`}
                                    onClick={() => handleColorChange('bg-[#FFABAB]')}
                                    aria-label="Light Red"
                                />
                                <button
                                    className={`w-6 h-6 rounded-full border ${selectedColor === '#FFF9C4' ? 'border-black' : ''} bg-[#FFF9C4]`}
                                    onClick={() => handleColorChange('bg-[#FFF9C4]')}
                                    aria-label="Light Yellow"
                                />
                                <button
                                    className={`w-6 h-6 rounded-full border ${selectedColor === '#CFD8DC' ? 'border-black' : ''} bg-[#CFD8DC]`}
                                    onClick={() => handleColorChange('bg-[#CFD8DC]')}
                                    aria-label="Light Gray"
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <Image
                                    width={25}
                                    height={25}
                                    src="/deletetrash.png"
                                    alt="Delete Trash"
                                    onClick={handleDelete}
                                    className='delete-btn'
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
