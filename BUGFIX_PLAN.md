# 🐛 Plainly MCP Server - Bug Fix Plan

## Issues Found During Testing

### Issue #1: create_project Returns 415 Error
**Error**: `415 - Content-Type 'application/json' is not supported`

**Location**: `src/plainly-client.ts:137-148` (createProject method)

**Current Code**:
```typescript
async createProject(data: {
  name: string;
  description?: string;
  metadata?: Record<string, any>;
}): Promise<PlainlyProject> {
  try {
    const response = await this.client.post("/projects", data);
    return response.data;
  } catch (error) {
    return this.handleError(error);
  }
}
```

**Problem**:
- Plainly API might expect different content type
- OR endpoint expects different data structure
- OR endpoint doesn't exist in API v2

**Fix Options**:
1. Check Plainly API docs for correct endpoint
2. Try different content-type header
3. Check if endpoint is `/api/v2/project` (singular) vs `/api/v2/projects` (plural)
4. Verify request body structure

**Priority**: HIGH (blocks project creation)

---

### Issue #2: get_render_stats Returns 404 Error
**Error**: `404 - No static resource api/v2/stats/renders`

**Location**: `src/plainly-client.ts:364-380` (getRenderStats method)

**Current Code**:
```typescript
async getRenderStats(options?: {
  projectId?: string;
  startDate?: string;
  endDate?: string;
}): Promise<RenderStats> {
  try {
    const params = new URLSearchParams();
    if (options?.projectId) params.append("projectId", options.projectId);
    if (options?.startDate) params.append("startDate", options.startDate);
    if (options?.endDate) params.append("endDate", options.endDate);

    const response = await this.client.get(`/stats/renders?${params.toString()}`);
    return response.data;
  } catch (error) {
    return this.handleError(error);
  }
}
```

**Problem**:
- Endpoint `/api/v2/stats/renders` doesn't exist
- May need different endpoint path
- Feature might not be available in API v2

**Fix Options**:
1. Check Plainly API docs for analytics endpoint
2. Try `/api/v2/analytics` or `/api/v2/renders/stats`
3. Remove feature if not supported in API
4. Make it optional/fallback gracefully

**Priority**: MEDIUM (nice to have, not critical)

---

## 🔍 Investigation Steps

### Step 1: Research Plainly API Documentation
- [ ] Find official API v2 documentation
- [ ] Check correct endpoints for projects
- [ ] Check if stats/analytics endpoint exists
- [ ] Verify request/response formats

### Step 2: Test API Directly
- [ ] Use curl to test `POST /api/v2/projects`
- [ ] Try different content types (application/json, application/x-www-form-urlencoded)
- [ ] Test alternative endpoint paths
- [ ] Document working endpoints

### Step 3: Fix Code
- [ ] Update createProject method with correct endpoint/format
- [ ] Fix or remove getRenderStats method
- [ ] Add better error handling
- [ ] Add comments explaining API quirks

### Step 4: Test Fixes
- [ ] Test create_project tool
- [ ] Test get_render_stats tool (or remove)
- [ ] Test full workflow (create → list → render)
- [ ] Update documentation

---

## 🛠️ Detailed Fix Plan

### Fix #1: create_project

#### Research Phase (5 mins)
```bash
# Test directly with curl
curl -X POST https://api.plainlyvideos.com/api/v2/projects \
  -u "x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib:" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Project"}'

# If that fails, try:
# - /api/v2/project (singular)
# - Different content type
# - Different body structure
```

#### Code Fix Options

**Option A: Different Content-Type**
```typescript
// Change axios header for this specific request
const response = await this.client.post("/projects", data, {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
```

**Option B: Different Endpoint**
```typescript
// Try singular
const response = await this.client.post("/project", data);
```

**Option C: Different Body Structure**
```typescript
// Maybe API expects nested structure
const requestBody = {
  project: {
    name: data.name,
    description: data.description,
    metadata: data.metadata
  }
};
const response = await this.client.post("/projects", requestBody);
```

#### Implementation
1. Test each option with curl
2. Find what works
3. Update code
4. Test with MCP server
5. Document the fix

---

### Fix #2: get_render_stats

#### Research Phase (5 mins)
```bash
# Test if endpoint exists
curl -X GET https://api.plainlyvideos.com/api/v2/stats/renders \
  -u "x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib:"

# Try alternatives:
curl -X GET https://api.plainlyvideos.com/api/v2/analytics
curl -X GET https://api.plainlyvideos.com/api/v2/renders/statistics
curl -X GET https://api.plainlyvideos.com/api/v2/stats
```

#### Code Fix Options

**Option A: Different Endpoint**
```typescript
// If we find the correct endpoint
const response = await this.client.get(`/analytics/renders?${params.toString()}`);
```

**Option B: Calculate from list_renders**
```typescript
// If no stats endpoint, calculate manually
async getRenderStats(options?: {
  projectId?: string;
  startDate?: string;
  endDate?: string;
}): Promise<RenderStats> {
  try {
    // Get all renders
    const renders = await this.listRenders({
      projectId: options?.projectId
    });

    // Calculate stats manually
    const stats: RenderStats = {
      totalRenders: renders.length,
      completedRenders: renders.filter(r => r.status === 'completed').length,
      failedRenders: renders.filter(r => r.status === 'failed').length,
      pendingRenders: renders.filter(r => r.status === 'pending').length,
      totalDuration: 0,
      averageDuration: 0
    };

    return stats;
  } catch (error) {
    return this.handleError(error);
  }
}
```

**Option C: Remove Feature**
```typescript
// If not supported, throw helpful error
async getRenderStats(): Promise<RenderStats> {
  throw new Error("Render statistics are not available in Plainly API v2. Use list_renders to get render data.");
}
```

#### Implementation
1. Test if endpoint exists anywhere
2. If yes: update path
3. If no: implement Option B or C
4. Test with MCP server
5. Update documentation

---

## 🎯 Execution Plan (30-45 minutes)

### Phase 1: Investigation (10 mins)
```bash
# Test create_project
curl -X POST https://api.plainlyvideos.com/api/v2/projects \
  -u "KEY:" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'

# Test stats endpoint
curl -X GET https://api.plainlyvideos.com/api/v2/stats/renders \
  -u "KEY:"

# Document findings
```

### Phase 2: Fix create_project (10-15 mins)
1. Identify correct endpoint/format
2. Update `src/plainly-client.ts:137-148`
3. Rebuild: `npm run build`
4. Test: `create_project({ name: "Test" })`
5. Verify it works

### Phase 3: Fix get_render_stats (10-15 mins)
1. Check if endpoint exists
2. Update method or implement fallback
3. Rebuild: `npm run build`
4. Test: `get_render_stats()`
5. Verify it works or fails gracefully

### Phase 4: Final Testing (5-10 mins)
1. Test all fixed tools
2. Test a full workflow
3. Update documentation
4. Commit and push to GitHub

---

## 📝 Testing Checklist

After fixes, test:

- [ ] `list_projects` - Still works
- [ ] `create_project` - NOW WORKS (fixed)
- [ ] `get_project` - Works with created project
- [ ] `list_templates` - Works with project
- [ ] `get_render_stats` - Works or fails gracefully (fixed)
- [ ] Error messages are helpful
- [ ] Documentation updated

---

## 🚀 Success Criteria

**Minimum Success**:
- ✅ create_project works
- ✅ Can create projects via MCP server
- ✅ get_render_stats either works or has clear error

**Full Success**:
- ✅ All tools work perfectly
- ✅ Complete test workflow passes
- ✅ Documentation updated
- ✅ Pushed to GitHub

---

## 📚 Resources Needed

1. **Plainly API Documentation**
   - https://api.plainlyvideos.com/docs (if exists)
   - https://help.plainlyvideos.com
   - Contact support if needed

2. **Testing Tools**
   - curl (for direct API testing)
   - Our MCP server (for tool testing)
   - API key (already have)

3. **Code Access**
   - `src/plainly-client.ts` - Main client file
   - `src/tools/index.ts` - Tool definitions
   - Build system - `npm run build`

---

## 🎯 Let's Start!

Ready to fix these bugs? Here's what we'll do:

1. **First**: Test the API directly with curl (5 mins)
2. **Then**: Fix the code based on findings (15 mins)
3. **Finally**: Test everything works (10 mins)

**Total time**: ~30 minutes

**Want to start now?**
