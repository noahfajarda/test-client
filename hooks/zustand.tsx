import { create } from "zustand";

export const userPfpStore = create((set) => ({
    profilePicture: "",
    updateProfilePicture: (pfp: any) => set((state: any) => ({
        profilePicture: pfp
    }))
}))