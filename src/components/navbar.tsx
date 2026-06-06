"use client";

type NavbarProps = {
  personName: string;
};

const navItems = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

function scrollToCenter(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export function Navbar({ personName }: NavbarProps) {
  return (
    <header id="navbar" className="navbar navbar--sticky">
      <nav className="navbar-inner" aria-label="Navegación principal">
        <p className="navbar-brand" aria-label={personName}>
          {personName}
        </p>
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-bracket-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToCenter(item.href.replace("#", ""));
                }}
              >
                [ {item.label} ]
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
