// Mirrors: credentials, users, user_addresses tables
export const currentUser = {
  user_id: 1,
  role_id: 1,
  name: "Jordan Reyes",
  phone: "+1 555 010 2938",
  status: "active",
  deleted_at: null,
  credential: {
    credential_id: 1,
    email: "jordan.reyes@example.com",
    email_verified_at: "2026-02-14",
    last_login_at: "2026-07-24T09:12:00",
    failed_attempts: 0,
  },
};

export const userAddresses = [
  {
    address_id: 1,
    user_id: 1,
    receiver_name: "Jordan Reyes",
    receiver_phone: "+1 555 010 2938",
    address_line: "228 Milbrook Lane, Apt 4B",
    city_province: "Phnom Penh",
    is_default: true,
  },
  {
    address_id: 2,
    user_id: 1,
    receiver_name: "Jordan Reyes",
    receiver_phone: "+1 555 010 2938",
    address_line: "Suite 12, Riverside Business Center",
    city_province: "Phnom Penh",
    is_default: false,
  },
];
