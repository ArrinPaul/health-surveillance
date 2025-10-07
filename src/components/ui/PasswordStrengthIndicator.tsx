"use client";

import React from 'react';
import { Check, X } from 'lucide-react';
import { validatePassword, getPasswordStrength, PasswordRequirement } from '@/lib/passwordValidation';

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

export function PasswordStrengthIndicator({ password, showRequirements = true }: PasswordStrengthIndicatorProps) {
  const { isValid, requirements } = validatePassword(password);
  const { level, score } = getPasswordStrength(password);

  const getStrengthColor = (level: string) => {
    switch (level) {
      case 'weak': return 'bg-red-500';
      case 'fair': return 'bg-orange-500';
      case 'good': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthText = (level: string) => {
    switch (level) {
      case 'weak': return 'Weak';
      case 'fair': return 'Fair';
      case 'good': return 'Good';
      case 'strong': return 'Strong';
      default: return '';
    }
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Password Strength</span>
          <span className={`font-medium ${
            level === 'weak' ? 'text-red-600' :
            level === 'fair' ? 'text-orange-600' :
            level === 'good' ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {getStrengthText(level)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(level)}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      {showRequirements && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
          <div className="space-y-1">
            {requirements.map((requirement) => (
              <div key={requirement.id} className="flex items-center space-x-2 text-sm">
                {requirement.met ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )}
                <span className={requirement.met ? 'text-green-700' : 'text-red-700'}>
                  {requirement.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordStrengthIndicator;