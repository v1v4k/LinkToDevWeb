const Footer = () => {
  return (
    <footer className="footer w-full bg-white text-neutral-content p-1  flex justify-center border-t border-base-300">
      <p>LinkToDev</p> 
      <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
    </footer>
  );
};

export default Footer;
