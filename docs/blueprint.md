# **App Name**: BidVerse

## Core Features:

- Auction Configuration: Allow an administrator user to configure the auction, setting parameters like the number of simulated bidders (with preset and custom values), currency, minimum bid, and bid increments. User may configure duration, or leave this as 'open'
- Live Bidding Dashboard: Display a dashboard showing all simulated bidders, their current bid amounts, a bid history log (with timestamps), and a visual timeline to indicate auction progress, powered by a generative AI tool that estimates bidders' next actions.
- Currency Management: Provide a dropdown or selection to choose the auction currency (USD, EUR, NGN), displaying other bids in an automatically-converted display
- Bid Validation: Enforce bid validation to ensure all bids meet the minimum bid and increment rules; the bidding UI shall ensure that bids not matching the validation rules are automatically rejected, preventing manual data entry errors.
- Real-time Notifications: Display real-time notifications for bid placements, outbids, and auction milestones (e.g., time warnings).
- Auction Result Display: Present an auction result page at auction conclusion, detailing the winner and winning bid amount.

## Style Guidelines:

- Primary color: A vibrant blue (#29ABE2) to evoke trust and excitement in bidding.
- Background color: A light grey (#F0F0F0) to provide a neutral backdrop that highlights the auction details.
- Accent color: A warm orange (#FF9933) to highlight important action items such as bidding buttons and notifications. 
- Body and headline font: 'Inter', a sans-serif font providing a clean, modern and readable interface.
- Use minimalist and intuitive icons for bidding actions, currency selection, and user navigation.
- Design a responsive, grid-based layout optimized for both desktop and mobile devices. Ensure key bidding information is prominently displayed.
- Incorporate subtle animations such as bid confirmations and real-time updates to keep users engaged.