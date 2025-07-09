import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 15,
  },

  // Headers
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray700,
  },

  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Buttons
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonOutline: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonOutlineText: {
    color: colors.primary,
  },

  // Text inputs
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.gray700,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.gray500,
    marginBottom: 4,
  },

  // Lists
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  listItemTitle: {
    fontSize: 16,
    color: colors.gray700,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: colors.gray500,
  },

  // Loading states
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Modal
  modal: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    margin: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray700,
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
  },

  // Error states
  error: {
    color: colors.accent,
    fontSize: 14,
    marginTop: 4,
  },

  // Empty states
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray500,
    textAlign: 'center',
    marginTop: 10,
  },
}); 