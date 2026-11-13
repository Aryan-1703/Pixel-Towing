import { useEffect, useRef, useState, type FocusEvent } from "react";
import { NavLink } from "react-router-dom";
import { SERVICE_AREAS } from "../content/cities";

interface LocationsMenuProps {
	/** Called after a link is chosen, so the parent can collapse the mobile navbar. */
	onNavigate: () => void;
}

const MENU_ID = "locations-menu";

const itemClass = ({ isActive }: { isActive: boolean }) => `dropdown-item${isActive ? " active" : ""}`;

/**
 * Disclosure menu styled with Bootstrap's dropdown CSS. Replaces react-bootstrap's
 * NavDropdown, which pulled Popper into every page's bundle. The links are always
 * in the DOM (hidden until opened), so the prerendered HTML lists every city.
 * The parent remounts it (via `key`) when the mobile navbar collapses, so it
 * never reopens in a stale state.
 */
const LocationsMenu = ({ onNavigate }: LocationsMenuProps) => {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return undefined;
		// pointerdown, not mousedown: iOS Safari doesn't fire mouse events for taps on plain content.
		const closeOnOutsidePointer = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			setOpen(false);
			toggleRef.current?.focus();
		};
		document.addEventListener("pointerdown", closeOnOutsidePointer);
		document.addEventListener("keydown", closeOnEscape);
		return () => {
			document.removeEventListener("pointerdown", closeOnOutsidePointer);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [open]);

	// Tabbing out of the menu closes it.
	const closeOnFocusLeave = (event: FocusEvent<HTMLDivElement>) => {
		if (!containerRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
	};

	const choose = () => {
		setOpen(false);
		onNavigate();
	};

	return (
		<div className="nav-item dropdown fw-medium mx-1" ref={containerRef} onBlur={closeOnFocusLeave}>
			<button
				ref={toggleRef}
				type="button"
				className="nav-link dropdown-toggle w-100"
				aria-expanded={open}
				aria-controls={MENU_ID}
				onClick={() => setOpen(current => !current)}
			>
				Locations
			</button>
			<div id={MENU_ID} className={`dropdown-menu${open ? " show" : ""}`}>
				<NavLink to="/locations" end className={args => `${itemClass(args)} fw-bold`} onClick={choose}>
					All service areas
				</NavLink>
				<hr className="dropdown-divider" />
				{SERVICE_AREAS.map(area => (
					<NavLink key={area.path} to={area.path} end className={itemClass} onClick={choose}>
						{area.name}
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default LocationsMenu;
