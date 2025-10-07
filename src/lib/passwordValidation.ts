export interface PasswordRequirement {
  id: string;
  label: string;
  validator: (password: string) => boolean;
  met?: boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'minLength',
    label: 'At least 8 characters long',
    validator: (password: string) => password.length >= 8
  },
  {
    id: 'uppercase',
    label: 'Contains uppercase letter (A-Z)',
    validator: (password: string) => /[A-Z]/.test(password)
  },
  {
    id: 'lowercase',
    label: 'Contains lowercase letter (a-z)',
    validator: (password: string) => /[a-z]/.test(password)
  },
  {
    id: 'number',
    label: 'Contains at least one number (0-9)',
    validator: (password: string) => /\d/.test(password)
  },
  {
    id: 'special',
    label: 'Contains special character (!@#$%^&*)',
    validator: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)
  }
];

export const validatePassword = (password: string): { isValid: boolean; requirements: PasswordRequirement[] } => {
  const requirements = passwordRequirements.map(req => ({
    ...req,
    met: req.validator(password)
  }));

  const isValid = requirements.every(req => req.met);

  return { isValid, requirements };
};

export const getPasswordStrength = (password: string): { level: 'weak' | 'fair' | 'good' | 'strong'; score: number } => {
  const { requirements } = validatePassword(password);
  const metCount = requirements.filter(req => req.met).length;
  const score = (metCount / requirements.length) * 100;

  let level: 'weak' | 'fair' | 'good' | 'strong';
  if (score < 40) level = 'weak';
  else if (score < 60) level = 'fair';
  else if (score < 80) level = 'good';
  else level = 'strong';

  return { level, score };
};