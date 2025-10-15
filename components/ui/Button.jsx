'use client';
import React from 'react';
export default function Button({ children, variant='primary', className='', ...props }){
  const base = 'btn ' + (variant === 'ghost' ? 'btn-ghost' : 'btn-primary');
  return <button className={`${base} ${className}`} {...props}>{children}</button>;
}
