import { describe, it, expect } from 'vitest';
import { cn, formatDate, slugify } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should join class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should filter out falsy values', () => {
      expect(cn('foo', null, 'bar', undefined, false)).toBe('foo bar');
    });
  });

  describe('formatDate', () => {
    it('should format date string', () => {
      const result = formatDate('2024-01-15');
      expect(result).toContain('2024');
      expect(result).toContain('1');
      expect(result).toContain('15');
    });
  });

  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should remove special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });
  });
});
