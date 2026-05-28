const Footer = () => {
  return (
    <div className="relative">
      {/* Footer content */}
      <footer
        className="w-full bg-base-200 border-t border-base-300 py-2 px-4
    flex flex-col sm:flex-row items-center justify-center
    gap-0.5 sm:gap-2 text-xs text-base-content/40 font-medium"
      >
        <span>LinkToDev</span>
        <span className="hidden sm:block">·</span>
        <span>
          Copyright © {new Date().getFullYear()} - All rights reserved
        </span>
      </footer>

      {/* Bottom accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />
    </div>
  );
};

export default Footer;
