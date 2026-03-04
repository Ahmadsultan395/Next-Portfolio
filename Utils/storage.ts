import { Profile } from '@/types';

const STORAGE_KEY = 'portfolio_profiles';

export const storage = {
  getProfiles: (): Profile[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading profiles from storage:', error);
      return [];
    }
  },

  saveProfile: (profile: Profile): void => {
    try {
      const profiles = storage.getProfiles();
      const existingIndex = profiles.findIndex(p => p.id === profile.id);
      
      if (existingIndex >= 0) {
        profiles[existingIndex] = { ...profile, updatedAt: new Date().toISOString() };
      } else {
        profiles.push({ ...profile, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    } catch (error) {
      console.error('Error saving profile to storage:', error);
    }
  },

  getProfileById: (id: string): Profile | null => {
    const profiles = storage.getProfiles();
    return profiles.find(p => p.id === id) || null;
  },

  getFirstProfile: (): Profile | null => {
    const profiles = storage.getProfiles();
    return profiles.length > 0 ? profiles[0] : null;
  },

  deleteProfile: (id: string): void => {
    try {
      const profiles = storage.getProfiles();
      const filtered = profiles.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  },

  updateProfileVisibility: (id: string, isVisible: boolean): void => {
    const profile = storage.getProfileById(id);
    if (profile) {
      storage.saveProfile({ ...profile, isVisible });
    }
  },
};
