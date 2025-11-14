import { ITEMS, BANNERS } from "./constants";
import { getRandomItem } from "./utils";

// Gacha Logic
export const performGacha = (currentBanner, wishlist, isPity = false, isSpark = false) => {
  const banner = BANNERS.find(b => b.id === currentBanner);

  if (isSpark) {
    const wishlistItems = wishlist.length > 0
      ? ITEMS.filter(i => wishlist.includes(i.id))
      : ITEMS.filter(i => i.rarity === "SSR");
    return getRandomItem(wishlistItems);
  }

  if (isPity) {
    const ssrItems = ITEMS.filter(i => i.rarity === "SSR");
    if (banner.featured.length > 0) {
      const featuredSSR = ssrItems.filter(i => banner.featured.includes(i.id));
      if (Math.random() < 0.5 && featuredSSR.length > 0) {
        return getRandomItem(featuredSSR);
      }
    }
    return getRandomItem(ssrItems);
  }

  const rand = Math.random();
  let rarity;

  if (rand < banner.rates.SSR) rarity = "SSR";
  else if (rand < banner.rates.SSR + banner.rates.SR) rarity = "SR";
  else if (rand < banner.rates.SSR + banner.rates.SR + banner.rates.R) rarity = "R";
  else rarity = "N";

  const itemsOfRarity = ITEMS.filter(i => i.rarity === rarity);
  const featured = itemsOfRarity.filter(i => banner.featured.includes(i.id));

  if (featured.length > 0 && Math.random() < 0.5) {
    return getRandomItem(featured);
  }

  return getRandomItem(itemsOfRarity);
};