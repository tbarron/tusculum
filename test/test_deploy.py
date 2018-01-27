import re
import tbx
from version import current_version


# -----------------------------------------------------------------------------
def test_deployable():
    """
    Check version against last git tag and check for untracked files or
    outstanding updates.
    """
    result = runcmd("git status --porc")

    # check for untracked files
    msg = "There are untracked files"
    assert "??" not in result, msg

    # check for unstaged updates or staged but uncommitted updates
    msg = "There are uncommitted updates, staged or unstaged"
    assert not re.findall("\n?(MM|MA|AM|AA|A |M | A| M)", result), msg

    # check the current version against the most recent tag
    result = runcmd("git --no-pager tag")
    tag_l = result.strip().split("\r\n")
    if 0 < len(tag_l):
        latest_tag = tag_l[-1]
    else:
        latest_tag = ""

    assert latest_tag == current_version(), "Version does not match tag"

    # verify that the most recent tag points at HEAD
    cmd = "git --no-pager log -1 --format=format:\"%H\""
    tag_hash = runcmd(cmd + " {}".format(latest_tag))
    head_hash = runcmd(cmd)
    assert head_hash == tag_hash, "Tag != HEAD"


# -----------------------------------------------------------------------------
def runcmd(cmd):
    """
    Run command and stringify stdout before returning it
    """
    return tbx.run(cmd)
