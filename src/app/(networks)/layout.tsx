type Props = {
  children: React.ReactNode;
};

export default function NetworksLayout({ children }: Props) {
  return <main className="h-screen">{children}</main>;
}
