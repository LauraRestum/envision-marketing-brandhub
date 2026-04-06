// ============================================================
// CONTENT MODEL — All dashboard content is driven by these types.
// Edit the corresponding data files to update content.
// ============================================================

export type ActionType = 'internal' | 'external' | 'modal' | 'anchor' | 'email';

export type ResourceCategory = 'brand' | 'template' | 'request' | 'policy' | 'guide' | 'tool';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: string;
  tag?: string;
  cta: string;
  actionType: ActionType;
  href?: string;
  modalKey?: string;
  assetPath?: string;
  thumbnail?: string;
  keywords: string[];
  icon?: string;
}

export interface DecisionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionType: ActionType;
  href?: string;
  modalKey?: string;
  anchorId?: string;
  keywords: string[];
}

export interface QuickLink {
  id: string;
  title: string;
  icon: string;
  actionType: ActionType;
  href?: string;
  modalKey?: string;
  anchorId?: string;
}

export interface RequestForm {
  id: string;
  title: string;
  description: string;
  helperText: string;
  icon: string;
  actionType: ActionType;
  href?: string;
  modalKey?: string;
  embedUrl?: string;
  keywords: string[];
}

export interface Policy {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  icon: string;
}

export interface FeaturedContent {
  id: string;
  title: string;
  description: string;
  cta: string;
  actionType: ActionType;
  href?: string;
  modalKey?: string;
}

// ============================================================
// ASSISTANT TYPES
// ============================================================

export type AssistantOutcome =
  | 'use_existing_resource'
  | 'use_template_or_library'
  | 'submit_request'
  | 'needs_manual_review';

export type RequestCategory =
  | 'design_asset'
  | 'print_or_reprint'
  | 'digital_update'
  | 'brand_asset'
  | 'messaging_content'
  | 'event_support'
  | 'storytelling'
  | 'template_request'
  | 'photography_imagery'
  | 'unknown';

export interface AssistantResponse {
  recommendation: string;
  outcome: AssistantOutcome;
  matchedResources: Resource[];
  followUpQuestions: string[];
  suggestedAction: {
    label: string;
    href?: string;
    modalKey?: string;
    anchorId?: string;
  };
  confidence: number;
  category: RequestCategory;
}
