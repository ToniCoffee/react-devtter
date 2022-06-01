import { useState, useEffect } from 'react';

import { onAuthStateChanged } from '_firebase/client';

export default function useUser() {
	const [user, setUser] = useState(undefined);

	useEffect(() => {
		onAuthStateChanged(setUser);
	}, []);

	return user;
}