


import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { toast } from 'sonner';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { baseUrl } from '../lib/base-url';
import { organizeFieldsByGroup } from '../lib/field-groups';
import { getFieldRows, getLayoutClasses, type FieldRow } from '../lib/field-layouts';
import { COLLECTIONS } from '../lib/collections-config';
import ImageUpload from './ImageUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Field {
  id: string;
  slug: string;
  displayName: string;
  type: string;
  required: boolean;
  helpText?: string;
  validations?: {
    singleLine?: boolean;
    maxLength?: number;
    format?: string;
    min?: number;
    max?: number;
    precision?: number;
  };
}

interface ItemEditorProps {
  collectionId: string;
  collectionSlug: string;
  itemId: string;
  fields: Field[];
  initialData: Record<string, any>;
  baseUrl: string;
}

// Color mapping from Webflow CSS variables
const COLOR_MAP: Record<string, string> = {
  'cowboy-umber': '#4e332d',
  'paper': '#faf9f9',
  'mist': '#f2f2f2',
  'alpine-linen': '#ebe8e0',
  'copper': '#9a5636',
  'lake-forest': '#0e301a',
  'bandana-red': '#d65241',
  'lodge-yellow': '#fddc4e',
  'smoke': '#343833',
  'ash': '#ccc7bb',
  'whiskey-sour': '#ddc5a4',
  'nude-ember': '#f2aaa9',
  'oxblood': '#69253a',
  'oxidized-teal': '#236b7d',
};

// Helper component for field labels with optional tooltip
function FieldLabel({ 
  htmlFor, 
  displayName, 
  isRequired, 
  helpText 
}: { 
  htmlFor: string; 
  displayName: string; 
  isRequired?: boolean; 
  helpText?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Label htmlFor={htmlFor} className="font-body text-sm font-medium text-foreground">
        {displayName}
        {isRequired && <span className="text-destructive ml-1">*</span>}
      </Label>
      {helpText && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-3.5 w-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-xs font-body">{helpText}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export default function ItemEditor({ 
  collectionId,
  collectionSlug,
  itemId, 
  fields, 
  initialData,
  baseUrl 
}: ItemEditorProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form data with initial values
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  const handleInputChange = (fieldSlug: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [fieldSlug]: value };
      
      // Auto-generate slug when name changes
      if (fieldSlug === 'name' && typeof value === 'string') {
        updated.slug = generateSlug(value);
      }
      
      return updated;
    });
  };

  const handleChange = (slug: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [slug]: value };
      
      // Auto-generate slug when name changes
      if (slug === 'name' && typeof value === 'string') {
        updated.slug = generateSlug(value);
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    // Validate required fields
    const requiredFields = fields.filter(f => f.isRequired);
    const missingFields = requiredFields.filter(f => {
      const value = formData[f.slug];
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(f => f.displayName).join(', ');
      setError(`Please fill in required fields: ${fieldNames}`);
      toast.error('Missing required fields', {
        description: `Please fill in: ${fieldNames}`,
      });
      setIsSaving(false);
      return;
    }

    try {
      const isNewItem = itemId === 'new';
      const url = isNewItem 
        ? `${baseUrl}/api/cms/${collectionId}`
        : `${baseUrl}/api/cms/${collectionId}/${itemId}`;
      
      const method = isNewItem ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fieldData: formData }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Failed to save: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Save successful:', result);
      
      if (isNewItem) {
        // Redirect to the newly created item's edit page
        const newItemId = result.id;
        toast.success('Item created successfully!', {
          description: 'Redirecting to edit page...',
        });
        
        // Get collection slug from COLLECTIONS
        const collection = COLLECTIONS.find(c => c.id === collectionId);
        if (collection && newItemId) {
          setTimeout(() => {
            window.location.href = `${baseUrl}/portal/${collection.slug}/${newItemId}`;
          }, 500);
        }
      } else {
        toast.success('Changes saved successfully!', {
          description: 'Your updates have been published to the CMS.',
        });
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error(itemId === 'new' ? 'Failed to create item' : 'Failed to save changes', {
        description: err instanceof Error ? err.message : 'An error occurred',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const isNew = itemId === 'new';
      const url = isNew
        ? `${baseUrl}/api/cms/${collectionId}`
        : `${baseUrl}/api/cms/${collectionId}/${itemId}`;

      const method = isNew ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldData: formData }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save item');
      }

      const savedItem = await response.json();
      
      // Publish the item after saving
      const publishResponse = await fetch(`${baseUrl}/api/cms/${collectionId}/${savedItem.id}/publish`, {
        method: 'POST',
      });

      if (!publishResponse.ok) {
        console.error('Failed to publish item, but save was successful');
      }

      // Redirect to the list page
      window.location.href = `${baseUrl}/portal/${collectionSlug}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSaving(false);
    }
  };

  const renderField = (field: any) => {
    const value = formData[field.slug];

    switch (field.type) {
      case 'PlainText':
      case 'Email':
      case 'Phone':
        const isSingleLine = field.validations?.singleLine !== false;
        const isCallToAction = field.slug === 'call-to-action';
        const inputSizeClass = isCallToAction ? 'input-sm' : 'input-xs';
        
        if (!isSingleLine) {
          // Multi-line plain text
          return (
            <div key={field.slug} className="space-y-1.5">
              <FieldLabel 
                htmlFor={field.slug}
                displayName={field.displayName}
                isRequired={field.required}
                helpText={field.helpText}
              />
              <Textarea
                id={field.slug}
                value={value || ''}
                onChange={(e) => handleChange(field.slug, e.target.value)}
                required={field.required}
                rows={4}
                className={`font-body resize-y ${inputSizeClass}`}
              />
            </div>
          );
        }
        
        // Single-line text
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Input
              id={field.slug}
              type="text"
              value={value || ''}
              onChange={(e) => handleChange(field.slug, e.target.value)}
              required={field.required}
              className={`font-body ${inputSizeClass}`}
            />
          </div>
        );

      case 'RichText':
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Textarea
              id={field.slug}
              value={value || ''}
              onChange={(e) => handleChange(field.slug, e.target.value)}
              required={field.required}
              rows={6}
              className="font-body resize-y"
            />
          </div>
        );

      case 'Number':
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Input
              id={field.slug}
              type="number"
              value={value ?? ''}
              onChange={(e) => handleChange(field.slug, e.target.value ? parseFloat(e.target.value) : null)}
              required={field.required}
              className="font-body"
            />
          </div>
        );

      case 'Bool':
      case 'Switch':
        return (
          <div key={field.slug} className="flex items-start justify-between gap-4 py-3">
            <div className="space-y-0.5 flex-1">
              <FieldLabel 
                htmlFor={field.slug}
                displayName={field.displayName}
                helpText={field.helpText}
              />
            </div>
            <Switch
              id={field.slug}
              checked={value === true}
              onCheckedChange={(checked) => handleChange(field.slug, checked)}
              className="mt-0.5"
            />
          </div>
        );

      case 'DateTime':
        const dateValue = value ? new Date(value).toISOString().slice(0, 16) : '';
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Input
              id={field.slug}
              type="datetime-local"
              value={dateValue}
              onChange={(e) => handleChange(field.slug, e.target.value ? new Date(e.target.value).toISOString() : null)}
              required={field.required}
              className="font-body"
            />
          </div>
        );

      case 'Link':
        const linkUrl = typeof value === 'object' ? value?.url : value;
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Input
              id={field.slug}
              type="url"
              value={linkUrl || ''}
              onChange={(e) => handleChange(field.slug, { url: e.target.value })}
              required={field.required}
              placeholder="https://example.com"
              className="font-body"
            />
          </div>
        );

      case 'Color':
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <div className="flex gap-2">
              <Input
                id={field.slug}
                type="color"
                value={value || '#000000'}
                onChange={(e) => handleChange(field.slug, e.target.value)}
                required={field.required}
                className="w-20 h-10 cursor-pointer"
              />
              <Input
                type="text"
                value={value || ''}
                onChange={(e) => handleChange(field.slug, e.target.value)}
                placeholder="#000000"
                className="font-mono flex-1"
              />
            </div>
          </div>
        );

      case 'Image':
        return (
          <ImageUpload
            key={field.slug}
            value={value || null}
            onChange={(newValue) => handleChange(field.slug, newValue)}
            label={field.displayName}
            required={field.required}
            helpText={field.helpText}
            collectionId={collectionId}
            baseUrl={baseUrl}
          />
        );

      case 'Option':
        const options = field.validations?.options || [];
        const isColorField = field.slug === 'button-color' || field.slug === 'text-color';
        
        return (
          <div key={field.slug} className="space-y-2">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <div className={isColorField ? "grid grid-cols-2 sm:grid-cols-3 gap-2" : "flex flex-wrap gap-2"}>
              {options.map((option) => {
                const normalizedName = option.name.toLowerCase().replace(/\s+/g, '-');
                const colorHex = isColorField ? COLOR_MAP[normalizedName] : null;
                
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleChange(field.slug, option.id)}
                    className={`px-3 py-2 border font-body text-sm transition-colors flex items-center gap-2 ${
                      value === option.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {colorHex && (
                      <span 
                        className="w-5 h-5 border border-border inline-block flex-shrink-0"
                        style={{ backgroundColor: colorHex }}
                      />
                    )}
                    <span className="truncate">{option.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'Reference':
      case 'MultiReference':
        const refValue = formData[field.slug];
        const displayName = refValue || 'Not set';
        return (
          <div key={field.slug} className="space-y-1.5">
            <FieldLabel 
              htmlFor={field.slug}
              displayName={field.displayName}
              isRequired={field.required}
              helpText={field.helpText}
            />
            <Input
              value={displayName}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Reference fields are read-only. ID: {refValue || 'none'}
            </p>
          </div>
        );

      default:
        return (
          <div key={field.slug} className="space-y-1.5">
            <Label className="font-body text-sm font-medium text-foreground">
              {field.displayName}
              <span className="text-xs text-muted-foreground ml-2 font-normal">({field.type})</span>
            </Label>
            <pre className="text-xs text-muted-foreground font-mono p-3 bg-muted border border-border overflow-x-auto">
              {JSON.stringify(value, null, 2)}
            </pre>
          </div>
        );
    }
  };

  // Organize fields by group
  const organizedFields = organizeFieldsByGroup(collectionSlug, fields);
  
  console.log('Organized fields:', Object.keys(organizedFields));
  console.log('Field groups:', Object.entries(organizedFields).map(([group, fields]) => `${group}: ${fields.length}`));

  // Early return if no fields
  if (!fields || fields.length === 0) {
    return (
      <div className="border border-border bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground font-body">
          No fields available for this collection.
        </p>
      </div>
    );
  }
  
  // Get field rows for layout
  const fieldRows = getFieldRows(collectionSlug, fields);
  
  // Create a map of field slug to field object for quick lookup
  const fieldMap = new Map(fields.map(f => [f.slug, f]));

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 sm:px-0">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive text-destructive font-body text-sm">
            {error}
          </div>
        )}

        <div className="space-y-10">
          {organizedFields.map((group) => {
            // Get the field slugs in this group
            const groupFieldSlugs = new Set(group.fields.map(f => f.slug));
            
            // Filter rows to only include fields in this group
            const groupRows = fieldRows.filter(row => 
              row.fields.some(f => groupFieldSlugs.has(f.slug))
            ).map(row => ({
              fields: row.fields.filter(f => groupFieldSlugs.has(f.slug))
            }));
            
            // Check if this is a collapsible geo-fencing section
            const isDomesticGeoFencing = group.name === 'Domestic Geo-Fencing';
            const isInternationalGeoFencing = group.name === 'International Geo-Fencing';
            const isCollapsible = isDomesticGeoFencing || isInternationalGeoFencing;
            
            // Get the active toggle field for this section
            const activeField = isDomesticGeoFencing ? 'geo-fencing-active' : 
                               isInternationalGeoFencing ? 'international-fencing-active' : null;
            const isActive = activeField ? formData[activeField] === true : true;
            
            // Special handling for Visibility section
            const isVisibility = group.name === 'Visibility';
            
            return (
              <section key={group.name} className="space-y-6">
                <div className="pb-3 border-b border-border">
                  <h2 className="font-heading text-base font-semibold text-foreground">{group.name}</h2>
                  {group.description && (
                    <p className="text-sm text-muted-foreground font-body mt-1">{group.description}</p>
                  )}
                </div>
                
                {isVisibility ? (
                  // Special layout for Visibility: Active first, then Member Only
                  <div className="space-y-6">
                    {/* Render Active first */}
                    {(() => {
                      const activeField = group.fields.find(f => f.slug === 'active');
                      return activeField ? renderField(activeField) : null;
                    })()}
                    
                    {/* Render Member Only second */}
                    {(() => {
                      const memberOnlyField = group.fields.find(f => f.slug === 'member-only');
                      return memberOnlyField ? renderField(memberOnlyField) : null;
                    })()}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Show active toggle first if collapsible */}
                    {isCollapsible && activeField && (
                      <div>
                        {renderField(fieldMap.get(activeField)!)}
                      </div>
                    )}
                    
                    {/* Show rest of fields only if active (for collapsible sections) or always (for non-collapsible) */}
                    {(!isCollapsible || isActive) && groupRows.map((row, rowIndex) => {
                      // Skip the active field row if we already rendered it
                      if (isCollapsible && row.fields.some(f => f.slug === activeField)) {
                        return null;
                      }
                      
                      // If single field in row, render normally
                      if (row.fields.length === 1) {
                        const fieldConfig = row.fields[0];
                        const field = fieldMap.get(fieldConfig.slug);
                        if (!field) return null;
                        
                        return (
                          <div key={`${group.name}-${rowIndex}`}>
                            {renderField(field)}
                          </div>
                        );
                      }
                      
                      // Multiple fields in row - use grid
                      return (
                        <div key={`${group.name}-${rowIndex}`} className="grid grid-cols-12 gap-4">
                          {row.fields.map(fieldConfig => {
                            const field = fieldMap.get(fieldConfig.slug);
                            if (!field) return null;
                            
                            const layoutClasses = getLayoutClasses(fieldConfig.layout);
                            
                            return (
                              <div key={field.slug} className={layoutClasses}>
                                {renderField(field)}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-8 mt-10 border-t border-border sticky bottom-0 bg-background pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Button 
            type="submit" 
            disabled={isSaving}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-button w-full sm:w-auto min-h-[44px]"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => window.history.back()}
            className="font-button w-full sm:w-auto min-h-[44px]"
          >
            Cancel
          </Button>
        </div>
      </form>
  );
}













