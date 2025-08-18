import { CurrentUser } from "../auth/authHelper";

export interface AuthContextType {
	isAuthenticated: boolean;
	user: CurrentUser | null;
	loading: boolean;
	login: (token: string) => Promise<void>;
	logout: (callback?: () => void) => void;
	reloadUser: () => Promise<void>;
}
