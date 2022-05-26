import Image from "next/image";

export default function Avatar({user}) {
	return (
		<div>
			<Image width={50} height={50} src={user.avatar} alt='avatar' />
			<strong>{user.name}</strong>
		</div>
	)
}