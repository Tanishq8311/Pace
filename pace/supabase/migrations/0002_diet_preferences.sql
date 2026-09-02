-- Diet module (Step 3) needs a diet type and meals/day preference on the profile
-- to drive the meal-matcher - the book's own recipe templates are split by
-- vegetarian/non-vegetarian, and its meal-planning instructions are "divide your
-- daily calories by number of meals".

alter table public.profiles
  add column diet_type text not null default 'vegetarian' check (
    diet_type in ('vegetarian', 'nonVegetarian')
  ),
  add column meals_per_day smallint not null default 5;
