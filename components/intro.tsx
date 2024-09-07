import Container from "./container";
import Link from "next/link";
import { useRouter } from 'next/router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Intro({ onReset }) {
  const router = useRouter();

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      router.push('/');
    }
  };

  return (
    <Container>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="uppercase text-xl md:text-xl font-bold tracking-tighter leading-tight md:pr-8">
          <div className="cursor-pointer" onClick={handleReset}>Tiny Shiny Cook Book</div>
        </h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/browse" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Browse
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/chefs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Chefs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/submit" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Submit a dish
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {/* You can add more NavigationMenuItems here in the future */}
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </Container>
  );
}