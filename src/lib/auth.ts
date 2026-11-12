import { UserRole, RoleProfile } from '../types/dashboard';

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  password: string; // Stored securely in client-state/localStorage
  fullNameAr: string;
  fullNameEn: string;
  jobTitleAr: string;
  jobTitleEn: string;
  role: UserRole;
  tenantId?: string; // For client managers & employees (e.g. 'tenant-bahed')
  tenantNameAr?: string;
  status: 'active' | 'requires_password_change' | 'pending_approval' | 'suspended';
  isTemporaryPassword?: boolean;
  temporaryPasswordIssued?: string;
  lastLoginAt?: string;
  phone?: string;
  avatarText: string;
  badgeColor: string;
  canManageUsers?: boolean;
  canApproveContracts?: boolean;
  canAccessVault?: boolean;
}

// Initial Certified User Database
export const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'usr-mostafa',
    username: 'mostafa.shaaban',
    email: 'ops@catering.eg',
    password: 'catering@2026',
    fullNameAr: 'م/ مصطفى شعبان',
    fullNameEn: 'Eng. Mostafa Shaaban',
    jobTitleAr: 'مدير العمليات المركزية (المسؤول الأعلى للنظام)',
    jobTitleEn: 'Chief Operations Officer (Supreme Admin)',
    role: 'ops_director',
    status: 'active',
    avatarText: 'MS',
    badgeColor: 'bg-orange-600 text-white',
    canManageUsers: true,
    canApproveContracts: true,
    canAccessVault: true,
    phone: '01000000001'
  },
  {
    id: 'usr-rakhawy',
    username: 'abdelmajeed.rakhawy',
    email: 'finance@catering.eg',
    password: 'finance@2026',
    fullNameAr: 'أ/ عبد المجيد الرخاوي',
    fullNameEn: 'Abdelmegid El Rakhawy',
    jobTitleAr: 'المدير المالي ورئيس الحسابات',
    jobTitleEn: 'Chief Financial Officer (Finance & Accounts)',
    role: 'cfo_accountant',
    status: 'active',
    avatarText: 'AR',
    badgeColor: 'bg-purple-600 text-white',
    canManageUsers: false,
    canApproveContracts: false,
    canAccessVault: false,
    phone: '01000000002'
  },
  {
    id: 'usr-bahed-admin',
    username: 'bahed.admin',
    email: 'admin@bahed.com',
    password: 'bahed@2026',
    fullNameAr: 'م/ كريم التهامي',
    fullNameEn: 'Eng. Karim El-Tohamy',
    jobTitleAr: 'مدير العمليات — الشركة الألمانية (BAHED / HA-BE)',
    jobTitleEn: 'Operations Manager — German Company (BAHED)',
    role: 'client_manager',
    tenantId: 'tenant-bahed',
    tenantNameAr: 'الشركة الألمانية — BAHED / HA-BE MARKET',
    status: 'active',
    avatarText: 'BH',
    badgeColor: 'bg-blue-600 text-white',
    phone: '01000000003'
  },
  {
    id: 'usr-bahed-emp',
    username: 'bahed.emp1',
    email: 'm.saber@bahed.com',
    password: 'emp@2026',
    fullNameAr: 'محمد صابر حسن',
    fullNameEn: 'Mohamed Saber Hassan',
    jobTitleAr: 'فني تشغيل — الشركة الألمانية',
    jobTitleEn: 'Plant Technician — German Company',
    role: 'client_employee',
    tenantId: 'tenant-bahed',
    tenantNameAr: 'الشركة الألمانية — BAHED / HA-BE MARKET',
    status: 'active',
    avatarText: 'MS',
    badgeColor: 'bg-slate-600 text-white',
    phone: '01000000004'
  },
  {
    id: 'usr-qasr-admin',
    username: 'qasr.admin',
    email: 'procure@qasrelainy.edu.eg',
    password: 'qasr@2026',
    fullNameAr: 'د/ سارة فهمي',
    fullNameEn: 'Dr. Sarah Fahmy',
    jobTitleAr: 'رئيس قسم التغذية العلاجية — مستشفى القصر العيني',
    jobTitleEn: 'Head of Clinical Nutrition — Qasr El Einy',
    role: 'client_manager',
    tenantId: 'tenant-qasr',
    tenantNameAr: 'مستشفى القصر العيني الفرنساوي',
    status: 'active',
    avatarText: 'QE',
    badgeColor: 'bg-emerald-600 text-white',
    phone: '01000000005'
  },
  {
    id: 'usr-temp-demo',
    username: 'temp.user',
    email: 'temp@company.eg',
    password: 'temp@123',
    fullNameAr: 'حساب تجريبي (بكلمة مرور مؤقتة)',
    fullNameEn: 'Demo User (Temporary Password)',
    jobTitleAr: 'مسؤول موقع جديد',
    jobTitleEn: 'Site Coordinator',
    role: 'client_manager',
    tenantId: 'tenant-royal',
    tenantNameAr: 'مستشفى رويال كير التخصصي',
    status: 'requires_password_change',
    isTemporaryPassword: true,
    temporaryPasswordIssued: 'temp@123',
    avatarText: 'TMP',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'usr-suspended-demo',
    username: 'suspended.user',
    email: 'suspended@client.eg',
    password: 'test@123',
    fullNameAr: 'حساب موقوف إدارياً',
    fullNameEn: 'Suspended Account Demo',
    jobTitleAr: 'حساب غير مفعل',
    jobTitleEn: 'Deactivated User',
    role: 'client_employee',
    status: 'suspended',
    avatarText: 'SUS',
    badgeColor: 'bg-rose-600 text-white'
  }
];

const STORAGE_USERS_KEY = 'catering_users_accounts_v1';
const STORAGE_SESSION_KEY = 'catering_active_session_v1';

export function getStoredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USER_ACCOUNTS));
      return INITIAL_USER_ACCOUNTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading stored users:', err);
    return INITIAL_USER_ACCOUNTS;
  }
}

export function saveStoredUsers(users: UserAccount[]): void {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Error saving users:', err);
  }
}

export function getActiveSessionUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading active session:', err);
    return null;
  }
}

export function setActiveSessionUser(user: UserAccount | null): void {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    } else {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Error writing active session:', err);
  }
}
