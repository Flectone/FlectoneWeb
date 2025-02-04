import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  name: string;
  about: string;
}

export default function UserCard({ name, about }: Props) {
  return (
    <Card className="dark:bg-neutral-800/50 w-1/3">
      <a href={`https://github.com/${name}`} rel="noopener noreferrer">
        <CardHeader className="flex gap-6">
          <Avatar>
            <AvatarImage src={`https://github.com/${name}.png`} alt="logo" />
            <AvatarFallback>{name} avatar</AvatarFallback>
          </Avatar>
          <CardTitle className="font-montserrat">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="font-inter">{about}</CardDescription>
        </CardContent>
      </a>
    </Card>
  );
}
