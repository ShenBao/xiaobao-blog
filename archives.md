---
layout: page
title: "归档"
permalink: /archives/
---

<!-- 这里获取的是_posts文件夹里的 -->

<div class="post-list">
    {% for post in site.posts  %}
        {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
        {% capture this_month %}{{ post.date | date: "%B" }}{% endcapture %}
        {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
        {% capture next_month %}{{ post.previous.date | date: "%B" }}{% endcapture %}

		{% if forloop.first %}
		<legend id="{{this_year}}-{{this_month}}">
			<b>
				{{this_year}} {{this_month}}
			</b>
		</legend>
		<ul>
		{% endif %}

		<li>
            <span>{{ post.date | date: "%F" }}</span>
            <b class='raqu'> &raquo; </b> 
            <a href="{{ post.url | relative_url }}"
                >
                {{ post.title }}
            </a>
        </li>

		{% if forloop.last %}
		</ul>
		{% else %}
            {% if this_year != next_year %}
                </ul>
                    <legend id="{{next_year}}-{{next_month}}">{{next_year}} {{next_month}}</legend>
                <ul>
            {% else %}
			{% if this_month != next_month %}
                </ul>
                    <legend id="{{next_year}}-{{next_month}}">{{next_year}} {{next_month}}</legend>
                <ul>
			{% endif %}
        {% endif %}
		{% endif %}
	{% endfor%}
    {% assign posts_collate = nil %}
</div>
