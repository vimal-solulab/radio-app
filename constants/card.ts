import { colors } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";

export const card = {
  favoriteCard: {
    width: 180,
    backgroundColor: colors.natural.cardBackground,
    borderRadius: radius.card,
    borderWidth: 0.5,
    borderColor: colors.border.medium,
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
  },

  recentCard: {
    width: 290,
    height: 120,
    backgroundColor: colors.natural.cardBackground,
    borderRadius: radius.card,
    borderWidth: 0.5,
    borderColor: colors.border.medium,
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
  },

  trendingCard: {
    width: 180,
    backgroundColor: colors.natural.cardBackground,
    borderRadius: radius.card,
    borderWidth: 0.5,
    borderColor: colors.border.medium,
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
  },
};
