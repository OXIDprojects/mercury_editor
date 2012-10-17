[{capture append="oxidBlock_content"}]
    [{assign var="oContent" value=$oView->getContent()}]
    [{assign var="tpl" value=$oViewConf->getActTplName()}]
    [{assign var="template_title" value=$oContent->oxcontents__oxtitle->value}]
    [{if $oxcmp_mercury->allowMercury()}]
    <h1 class="pageHead mercury-region" data-type="editable" data-oxfield="oxtitle" data-oxcls="oxcontent" data-oxid="[{$oView->getContentId()}]">[{$oContent->oxcontents__oxtitle->value}]</h1>
    [{else}]
    <h1 class="pageHead">[{$oContent->oxcontents__oxtitle->value}]</h1>
    [{/if}]
    [{ oxcontent oxid=$oView->getContentId() }]
    [{ insert name="oxid_tracker" title=$template_title }]
[{/capture}]
[{include file="layout/page.tpl" sidebar="Left"}]
