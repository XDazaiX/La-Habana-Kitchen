# Design Guidelines: Cuban Food Delivery E-commerce

## Design Approach

**Reference-Based:** Drawing inspiration from successful food delivery platforms (DoorDash, Uber Eats) combined with vibrant Cuban cultural aesthetics. Focus on appetizing visual presentation and streamlined ordering flow.

**Core Principles:**
- Food-forward design with high-quality imagery
- Warm, inviting atmosphere reflecting Cuban culture
- Frictionless path from browsing to checkout
- Mobile-optimized for on-the-go ordering

## Typography System

**Headings:** Montserrat (Bold/SemiBold) - modern, friendly, excellent readability
- Hero/Page titles: text-4xl to text-6xl, font-bold
- Section headings: text-3xl, font-semibold
- Product names: text-xl, font-semibold

**Body:** Inter (Regular/Medium) - clean, highly legible for prices and descriptions
- Product descriptions: text-base, font-normal
- Prices: text-lg to text-2xl, font-semibold
- Form labels: text-sm, font-medium
- Body text: text-base

## Layout System

**Spacing Units:** Tailwind units of 3, 4, 6, 8, 12, 16
- Component padding: p-6, p-8
- Section spacing: py-12, py-16
- Grid gaps: gap-6, gap-8
- Card spacing: p-4, p-6

**Container Strategy:**
- Maximum width: max-w-7xl for main content
- Product grids: max-w-6xl
- Checkout flow: max-w-2xl (focused, distraction-free)

**Grid Systems:**
- Desktop: 3-4 column product grid (grid-cols-3 lg:grid-cols-4)
- Tablet: 2 columns (md:grid-cols-2)
- Mobile: Single column with large cards

## Component Library

### Navigation
**Sticky Header:**
- Logo left, cart icon with badge right
- Category quick-links (desktop horizontal, mobile hamburger)
- Visible total in cart icon
- Thin shadow on scroll for depth

### Hero Section
**Full-width banner (h-96 to h-[32rem]):**
- Large appetizing hero image of signature Cuban dish
- Overlaid heading: "Auténtica Comida Cubana a Domicilio"
- CTA button with blurred backdrop (backdrop-blur-md)
- No hover states on hero buttons

### Product Cards
**Elevated card design:**
- Square/portrait food image (aspect-ratio-4/3)
- Product name, brief description (2 lines max)
- Bold price display
- "Agregar al Carrito" button
- Subtle shadow (shadow-md), lift on hover (hover:shadow-xl)

### Category Sections
**Organized by meal type:**
- Section headers with decorative elements
- Horizontal scroll on mobile for featured items
- Grid layout for full catalog
- Categories: Platos Principales, Acompañantes, Postres, Bebidas

### Shopping Cart (Sidebar/Overlay)
**Slide-in panel:**
- Product thumbnails with names
- Quantity adjusters (+/- buttons)
- Remove item option
- Subtotal + delivery fee breakdown
- Sticky "Proceder al Pago" button
- Empty state illustration

### Checkout Flow
**Multi-step or single-page form:**
- Delivery information (nombre, dirección, teléfono)
- Order summary sidebar (sticky on desktop)
- Clear total with breakdown
- Confirmation message with order number

### Footer
**Informative and trustworthy:**
- Contact information and delivery hours
- Social media links
- Payment methods accepted
- Delivery areas served
- Brief story about authentic Cuban cooking

## Images

**Hero Image:** Full-width banner featuring vibrant Cuban dish (e.g., Ropa Vieja, Arroz con Pollo) with visible texture and colors. Professional food photography with warm lighting.

**Product Images:** Square format, consistent styling, well-lit food photography on neutral backgrounds. Each dish photographed to highlight freshness and portion size.

**Category Banners:** Smaller decorative images for each food category section.

**Empty States:** Friendly illustration for empty cart ("Tu carrito está vacío").

## Animations

**Minimal and purposeful:**
- Smooth cart slide-in/out transitions
- Gentle hover lift on product cards
- Quantity button micro-interactions
- Success confirmation animations (checkmark)
- No distracting scroll effects

## Accessibility

- Clear focus states on all interactive elements
- Sufficient contrast for text over images (use overlays)
- Alt text for all food images
- Keyboard navigation through product catalog
- Screen reader announcements for cart updates

## Mobile Optimization

- Larger tap targets (min 44x44px)
- Sticky "Ver Carrito" button at bottom
- Simplified navigation
- One-column product grid with large images
- Easy thumb-reach checkout button placement

This design creates an appetizing, culturally authentic experience that drives conversions while honoring Cuban culinary traditions.