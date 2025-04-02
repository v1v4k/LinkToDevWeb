const Footer = () => {
  return (
    <footer className="footer w-full bg-white text-neutral-content p-2  fixed bottom-0 flex justify-center">
      <p>LinkToDev</p> 
      <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
    </footer>
  );
};

export default Footer;
