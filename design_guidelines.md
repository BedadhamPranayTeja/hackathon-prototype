# Hackathon Management App - Design Guidelines

## Design Approach
**Selected Approach**: Design System Approach using Material Design principles
**Justification**: This is a utility-focused productivity application requiring clear information hierarchy, consistent patterns, and efficient user workflows for hackathon management.

## Core Design Elements

### Color Palette
**Primary Colors**:
- Light mode: 240 100% 60% (vibrant blue)
- Dark mode: 240 80% 70% (softer blue)

**Accent Colors**:
- Success: 142 76% 36% (green for completed submissions)
- Warning: 38 92% 50% (amber for pending deadlines)
- Error: 0 84% 60% (red for errors/rejections)

**Backgrounds**:
- Light mode: 0 0% 98% (warm white)
- Dark mode: 222 84% 5% (deep blue-gray)

### Typography
**Font Family**: Inter via Google Fonts CDN
- **Headers**: Inter 600-700 (semibold to bold)
- **Body text**: Inter 400-500 (regular to medium)
- **Captions**: Inter 400 (regular, smaller size)

### Layout System
**Spacing Units**: Tailwind classes using 2, 4, 6, 8, 12, 16
- **Tight spacing**: p-2, m-2 (cards, buttons)
- **Standard spacing**: p-4, m-4 (sections, forms)
- **Generous spacing**: p-8, m-8 (page containers)

### Component Library

**Navigation**:
- Clean sidebar with icon + label navigation
- Breadcrumb navigation for deep pages
- Tab navigation for hackathon details/submissions

**Cards & Data Display**:
- Material-inspired elevated cards with subtle shadows
- List views with clear row separators
- Badge components for skills, roles, and status indicators
- Progress indicators for submission deadlines

**Forms**:
- Floating label inputs with Material Design styling
- Multi-step forms for hackathon applications
- File upload areas with drag-and-drop styling
- Form validation with inline error states

**Interactive Elements**:
- Primary buttons with the brand blue
- Ghost buttons for secondary actions
- Icon buttons for quick actions (edit, delete, favorite)
- Toggle switches for settings and preferences

**Overlays**:
- Modal dialogs for team invitations and confirmations
- Toast notifications for real-time updates
- Drawer components for filters and advanced options

### Key Design Patterns

**Dashboard Layout**: Grid-based layout showcasing upcoming deadlines, team activity, and hackathon opportunities

**Team Discovery**: Card-based layout with filtering sidebar, emphasizing skills matching and team composition

**Submission Flow**: Step-by-step wizard with clear progress indication and validation feedback

**Chat Interface**: Clean messaging interface integrated within team pages, with typing indicators and message status

### Responsive Behavior
- Mobile-first approach with collapsible sidebar
- Card layouts that stack on smaller screens
- Touch-friendly button sizes (minimum 44px)
- Horizontal scrolling for data tables on mobile

This design system prioritizes clarity and efficiency while maintaining visual appeal appropriate for a developer-focused platform.