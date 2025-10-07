"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showToggle?: boolean;
}

export function PasswordInput({ 
  showToggle = true, 
  className = '', 
  ...props 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={`pr-10 ${className}`}
      />
      {showToggle && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-400" />
          ) : (
            <Eye className="h-4 w-4 text-gray-400" />
          )}
          <span className="sr-only">
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      )}
    </div>
  );
}

export default PasswordInput;