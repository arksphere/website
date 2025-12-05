import {
  LayoutDashboard,
  Code2,
  Container,
  Activity,
  PlayCircle,
} from "lucide-react";
import { ViewState, NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: ViewState.SCENARIO, label: "Overview", icon: LayoutDashboard },
  { id: ViewState.DEVELOPMENT, label: "Agent Dev", icon: Code2 },
  { id: ViewState.KUBERNETES, label: "Deployment", icon: Container },
  { id: ViewState.OPERATIONS, label: "Operations", icon: Activity },
  { id: ViewState.WALKTHROUGH, label: "Live Demo", icon: PlayCircle },
];
