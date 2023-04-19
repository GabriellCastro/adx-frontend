import React from "react";
import Link from "next/link";

type Props = {};

const ListItem = ({}: Props) => <Link href="/users/[id]" as={`/users/`}></Link>;

export default ListItem;
